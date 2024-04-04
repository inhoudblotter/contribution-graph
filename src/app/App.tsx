import { Description } from "../components/Description";
import { Table } from "../components/Table";
import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <Table className={styles.table} />
        <Description />
      </div>
    </main>
  );
}
