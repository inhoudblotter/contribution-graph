import { useMemo } from "react";
import { IContributions } from "../../../types/IContributions";
import { cn } from "../../../utils/cn";
import styles from "./HeatMap.module.css";
import { formatDate } from "../../../utils/formatDate";
import { Item } from "./Item";

interface IHeatMap extends React.HTMLAttributes<HTMLUListElement> {
  date: Date;
  contributions: IContributions;
}

export function HeatMap({
  date,
  contributions,
  className,
  ...props
}: IHeatMap) {
  const dates = useMemo(() => {
    const cursor = new Date(date);
    const dayOfWeek = cursor.getDay();
    let weekPad = 0;
    if (dayOfWeek !== 0) weekPad = 8 - dayOfWeek;
    cursor.setDate(cursor.getDate() - 357 + weekPad);
    const dates: { date: Date; str: string }[] = [];
    for (let i = 0; ++i <= 357; ) {
      dates.push({ date: new Date(cursor), str: formatDate(cursor) });
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }, [date]);
  console.log(dates.length);
  console.log(dates);
  return (
    <ul className={cn(styles.container, className)} {...props}>
      {dates.map((el, i) => (
        <Item
          key={i}
          date={el.date}
          contributions={contributions[el.str] || 0}
        />
      ))}
    </ul>
  );
}
