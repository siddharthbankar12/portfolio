import { useEffect, useState, useRef } from "react";
import { getVisitorCount, trackVisit } from "../services/apiCalls";

let cachedVisitorCount = null;
let hasFetchedRef = false;

const useVisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState(cachedVisitorCount || null);
  const hasTrackedRef = useRef(false);

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000,
        },
      );
    });
  };

  useEffect(() => {
    const trackPageVisit = async () => {
      if (hasTrackedRef.current) return;
      hasTrackedRef.current = true;

      const location = await getCurrentLocation();

      const visitData = {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        language: navigator.language,
        page: window.location.pathname,
        ...(location && {
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      };

      try {
        trackVisit(visitData);
      } catch (error) {
        console.log("Visit tracking failed:", error);
      }
    };

    trackPageVisit();

    const fetchVisitorCount = async () => {
      if (hasFetchedRef) return;
      hasFetchedRef = true;
      try {
        const data = await getVisitorCount();
        cachedVisitorCount = data.count;
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setVisitorCount(0);
      }
    };

    fetchVisitorCount();
  }, []);

  return { visitorCount };
};

export default useVisitorTracker;