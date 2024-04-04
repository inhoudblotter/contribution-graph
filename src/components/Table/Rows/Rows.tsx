import React from "react";
import { DAYS } from "../../../constants/days";
import styles from "./Rows.module.css";
import { cn } from "../../../utils/cn";

interface IRows extends React.HTMLAttributes<HTMLUListElement> {}

export function Rows({ className, ...props }: IRows) {
  return (
    <ul className={cn(styles.container, className)} {...props}>
      {DAYS.map((el, i) => (
        <li
          key={i}
          className={cn(styles.item, ![0, 2, 4].includes(i) && styles.hidden)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}
