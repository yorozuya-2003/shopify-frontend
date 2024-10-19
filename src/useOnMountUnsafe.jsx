import { useEffect, useRef } from "react";

export const useOnMountUnsafe = (effect) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effect();
    }
  }, []);
}
