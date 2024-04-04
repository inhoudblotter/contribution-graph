import { RefObject, useCallback, useEffect, useState } from "react";

export function useSelect<Element extends HTMLElement>(
  ref: RefObject<Element>
) {
  const [isSelected, setSelected] = useState(false);
  const focusIn = useCallback(() => {
    setSelected(true);
    const el = ref.current;
    if (el)
      el.addEventListener("focusout", () => setSelected(false), { once: true });
  }, [ref, setSelected]);
  useEffect(() => {
    const el = ref.current;
    if (el) el.addEventListener("focusin", focusIn);
    return () => {
      if (el) el.removeEventListener("focusin", focusIn);
    };
  }, [ref, focusIn]);
  return { isSelected, setSelected };
}
