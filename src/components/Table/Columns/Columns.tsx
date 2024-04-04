import { useMemo } from "react";
import { cn } from "../../../utils/cn";
import styles from "./Columns.module.css";
import { MONTHS } from "../../../constants/months";
import { getPercentageOfMonth } from "./utils/getPercentageOfMonth";

interface IColumns extends React.HTMLAttributes<HTMLUListElement> {
  date: Date;
}

export function Columns({ date, className, ...props }: IColumns) {
  const [months, total_percentage] = useMemo(() => {
    const cursor = new Date(date);
    cursor.setDate(cursor.getDate() - 356);
    const months = [
      {
        label: MONTHS[cursor.getMonth()],
        percent: 1 - getPercentageOfMonth(cursor),
      },
    ];
    for (let i = -1; ++i < 11; ) {
      cursor.setMonth(cursor.getMonth() + 1);
      months.push({ label: MONTHS[cursor.getMonth()], percent: 100 });
    }
    cursor.setMonth(cursor.getMonth() + 1);
    months.push({
      label: MONTHS[cursor.getMonth()],
      percent: getPercentageOfMonth(date),
    });
    const total_percentage =
      (months.length - 2) * 100 +
      months[0].percent +
      months[months.length - 1].percent;
    return [months, total_percentage];
  }, [date]);
  return (
    <ul className={cn(styles.container, className)} {...props}>
      {months.map((el, i) => (
        <li
          key={i}
          className={cn(styles.item, el.percent < 75 && styles.hidden)}
          style={
            {
              "--size": `${Math.round((el.percent / total_percentage) * 100)}%`,
            } as React.CSSProperties
          }
        >
          {el.label}
        </li>
      ))}
    </ul>
  );
}
