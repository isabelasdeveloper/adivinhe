import styles from "./styles.module.css";

type Props = React.ComponentProps<"button"> & {
  title: string;
};

export function Button({ title, ...spread }: Props) {
  return (
    <div>
      <button className={styles.container} {...spread}>
        {title}
      </button>
    </div>
  );
}
