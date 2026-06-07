import { useEffect, useState, useRef, useCallback } from "react";
import { getVisitorCount, trackVisit } from "../services/apiCalls";

let cachedVisitorCount = null;
let hasFetchedRef = false;

const useVisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState(cachedVisitorCount || null);
  const hasTrackedRef = useRef(false);
  const listenerAddedRef = useRef(false);

  const getCurrentLocation = useCallback(() => {
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
            accuracy: position.coords.accuracy,
          });
        },
        () => resolve(null),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        }
      );
    });
  }, []);

  const trackVisitWithLocation = useCallback(async () => {
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
      await trackVisit(visitData);
    } catch (error) {
      console.log("Visit tracking failed:", error);
    }
  }, [getCurrentLocation]);

  useEffect(() => {
    trackVisitWithLocation();

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

    const addInteractionListener = () => {
      if (listenerAddedRef.current) return;
      listenerAddedRef.current = true;

      const handleInteraction = () => {
        trackVisitWithLocation();
        document.removeEventListener("touchstart", handleInteraction);
        document.removeEventListener("click", handleInteraction);
      };

      document.addEventListener("touchstart", handleInteraction, { once: true });
      document.addEventListener("click", handleInteraction, { once: true });
    };

    const timer = setTimeout(addInteractionListener, 100);

    return () => clearTimeout(timer);
  }, [trackVisitWithLocation]);

  return { visitorCount };
};

export default useVisitorTracker;