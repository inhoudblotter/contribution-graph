import { RefObject, useCallback, useEffect, useState } from "react";

export function useHover<Element extends HTMLElement>(ref: RefObject<Element>) {
  const [isHover, setHover] = useState(false);
  const mouseIn = useCallback(() => {
    setHover(true);
    const el = ref.current;
    if (el)
      el.addEventListener("mouseleave", () => setHover(false), { once: true });
  }, [setHover, ref]);
  useEffect(() => {
    const el = ref.current;
    if (el) el.addEventListener("mouseenter", mouseIn);
    return () => {
      if (el) el.removeEventListener("mouseenter", mouseIn);
    };
  }, [ref, mouseIn]);
  return { isHover, setHover };
}
