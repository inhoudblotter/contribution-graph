import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import styles from "./Tooltip.module.css";
interface ITooltip extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export function Tooltip({ className, children, ...props }: ITooltip) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      // Vertical position
      const pos = el.getBoundingClientRect();
      if (pos.top < 0) el.classList.add(styles.bottom);
      // Horizontal position
      const currentPostion = Number(
        el.style.getPropertyValue("--left-position").split("px")[0]
      );
      const center = pos.width / 2;
      let projection = -center;
      let rightLedge = pos.right - window.innerWidth;
      if (currentPostion) rightLedge -= currentPostion - projection;
      let leftLedge = pos.left;
      if (currentPostion) leftLedge += currentPostion - projection;
      if (rightLedge > 0) {
        projection -= rightLedge + 2;
      } else if (leftLedge < 0) {
        projection -= leftLedge - 2;
      }
      el.style.setProperty(
        "--left-position",
        `${Math.round(projection * 1000) / 1000}px`
      );
      requestAnimationFrame(() => el.classList.add(styles.open));
    }
  }, [ref]);
  return (
    <div className={cn(styles.container, className)} {...props} ref={ref}>
      {children}
    </div>
  );
}
