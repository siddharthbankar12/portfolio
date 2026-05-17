import { useEffect, useState, useRef } from "react";

const useVisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const hasTrackedRef = useRef(false);

  // Get current location using browser's Geolocation API
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
          maximumAge: 300000, // 5 minutes
        },
      );
    });
  };

  useEffect(() => {
    // Track page visit only once
    const trackVisit = async () => {
      if (hasTrackedRef.current) return;
      hasTrackedRef.current = true;

      // Get current location first
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
        // Backend URL from environment variable (set during deployment)
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        if (!backendUrl) {
          console.warn(
            "REACT_APP_BACKEND_URL not set, skipping visit tracking",
          );
          return;
        }

        await fetch(`${backendUrl}/api/track-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitData),
          // Don't wait for response - fire and forget
          keepalive: true,
        });
      } catch (error) {
        console.log("Visit tracking failed:", error);
      }
    };

    trackVisit();

    // Fetch visitor count
    const fetchVisitorCount = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        if (!backendUrl) {
          console.warn(
            "REACT_APP_BACKEND_URL not set, cannot fetch visitor count",
          );
          setVisitorCount(0);
          return;
        }

        const response = await fetch(`${backendUrl}/api/visitor-count`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        // Set to 0 instead of null so UI shows "0" instead of "---"
        setVisitorCount(0);
      }
    };

    fetchVisitorCount();
  }, []); // Empty dependency array - runs only once on mount

  return { visitorCount };
};

export default useVisitorTracker;
