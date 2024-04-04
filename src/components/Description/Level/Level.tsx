import { useCallback, useRef } from "react";
import { useHover } from "../../../hooks/useHover";
import { Tooltip } from "../../../ui/Tooltip";
import { cn } from "../../../utils/cn";
import styles from "./Level.module.css";
interface ILevel extends React.HTMLAttributes<HTMLLIElement> {
  color: string;
  descr: string;
}

export function Level({ className, color, descr, ...props }: ILevel) {
  const ref = useRef<HTMLLIElement>(null);
  const { isHover, setHover } = useHover<HTMLLIElement>(ref);
  const closeTooltip = useCallback(() => {
    setHover(false);
  }, [setHover]);
  return (
    <li
      className={cn(styles.container, className)}
      style={{ "--color": color } as React.CSSProperties}
      {...props}
      ref={ref}
    >
      {isHover && (
        <Tooltip onClose={closeTooltip}>
          <span className={styles.descr}>{descr}</span>
        </Tooltip>
      )}
    </li>
  );
}
