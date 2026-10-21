import styles from "./styles.module.css";

type Props = React.ComponentProps<"input">;

export function Input({ ...spread }: Props) {
  return <input type="text" className={styles.container} {...spread} />;
}
