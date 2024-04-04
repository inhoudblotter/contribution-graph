import { useCallback, useMemo, useRef } from "react";
import { LEVELS } from "../../../../constants/levels";
import { cn } from "../../../../utils/cn";
import styles from "./Item.module.css";
import { Tooltip } from "../../../../ui/Tooltip";
import { useSelect } from "../../../../hooks/useSelect";
import { DAYS_LONG } from "../../../../constants/days";
import { MONTHS_LONG } from "../../../../constants/months";
interface IItem extends React.HTMLAttributes<HTMLLIElement> {
  date: Date;
  contributions: number;
}

export function Item({ className, date, contributions, ...props }: IItem) {
  const color = useMemo(() => {
    const level =
      contributions <= 0
        ? LEVELS[0]
        : LEVELS.find((el) => contributions <= el.threshold);
    return level ? level.color : LEVELS[0].color;
  }, [contributions]);
  const dateString = useMemo(() => {
    return `${DAYS_LONG[date.getDay()]}, ${
      MONTHS_LONG[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }, [date]);
  const ref = useRef<HTMLLIElement>(null);
  const { isSelected, setSelected } = useSelect(ref);
  const closeTooltip = useCallback(() => {
    setSelected(false);
  }, [setSelected]);
  return (
    <li
      className={cn(styles.container, className)}
      style={{ "--color": color } as React.CSSProperties}
      {...props}
      tabIndex={0}
      ref={ref}
    >
      {isSelected && (
        <Tooltip className={styles.tooltip} onClose={closeTooltip}>
          {
            <>
              <span
                className={styles.count}
              >{`${contributions} contributions`}</span>
              <span className={styles.date}>{dateString}</span>
            </>
          }
        </Tooltip>
      )}
    </li>
  );
}
