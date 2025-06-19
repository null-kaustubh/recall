import { useEffect } from "react";

export default function useClickOutside(elementRef, callback) {
  useEffect(() => {
    const handleRef = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleRef);

    return () => {
      document.removeEventListener("mousedown", handleRef);
    };
  }, [elementRef, callback]);
}
