import { LEVELS } from "../../constants/levels";
import { cn } from "../../utils/cn";
import styles from "./Description.module.css";
import { Level } from "./Level/Level";

interface IDescription extends React.HTMLAttributes<HTMLDivElement> {}

export function Description({ className, ...props }: IDescription) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      <span className={styles.label}>Меньше</span>
      <ul className={styles.levels}>
        {LEVELS.map((el, i) => (
          <Level key={i} color={el.color} descr={el.descr} />
        ))}
      </ul>
      <span className={styles.label}>Больше</span>
    </div>
  );
}
