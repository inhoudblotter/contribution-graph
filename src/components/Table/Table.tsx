import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { Columns } from "./Columns";
import { HeatMap } from "./HeatMap";
import { Rows } from "./Rows";
import styles from "./Table.module.css";
import { getContributions } from "../../api/getContributions";
import { IContributions } from "../../types/IContributions";

interface ITable extends React.HTMLAttributes<HTMLDivElement> {}

export function Table({ className, ...props }: ITable) {
  const date = new Date();
  const [contributions, setContributions] = useState<IContributions>({});
  useEffect(() => {
    getContributions().then((c) => {
      setContributions(c);
    });
  }, []);
  return (
    <div className={cn(styles.container, className)} {...props}>
      <Rows />
      <div className={styles.table}>
        <Columns date={date} />
        <HeatMap date={date} contributions={contributions} />
      </div>
    </div>
  );
}
