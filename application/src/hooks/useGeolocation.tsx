import { useEffect, useState } from "react";

type PositionType = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: EpochTimeStamp;
};

export default function useGeolocation(timeout = 5000, maximumAge = 0, enableHighAccuracy = true) {
  const [status, setStatus] = useState<'prompt' | 'denied' | 'granted'>('prompt')
  const [position, setPosition] = useState<PositionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const success = ({coords, timestamp}: GeolocationPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: coords.speed,
      heading: coords.heading,
      timestamp,
    });
    setStatus('granted');
    setError(null);
  };

  const errors = (err: GeolocationPositionError) => {
    setError(err.message);
    setStatus('denied');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const permissionStatus = navigator.permissions.query({ name: 'geolocation' });
      permissionStatus.then((result) => {
        setStatus(result.state);
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success, errors, { timeout, maximumAge, enableHighAccuracy });
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(success, errors, { timeout, maximumAge, enableHighAccuracy });
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }
      });

      const watchId = navigator.geolocation.watchPosition(success, errors, { timeout, maximumAge, enableHighAccuracy });
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported');
    }
  }, [timeout, maximumAge, enableHighAccuracy]);

  return { status, position, error };
}