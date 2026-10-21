import styles from "./styles.module.css";

type Props = {
  value?: string;
  variant?: "default" | "small";
  color?: "default" | "right" | "wrong";
};

export function Letters({
  value,
  variant = "default",
  color = "default",
}: Props) {
  return (
    <div
      className={`${styles.container} ${styles[variant] ?? ""} ${styles[color] ?? ""}`}
    >
      <span>{value}</span>
    </div>
  );
}
