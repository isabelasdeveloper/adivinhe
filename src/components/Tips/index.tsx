import styles from "./styles.module.css";
import iconTip from "../../assets/tip.svg";

type Props = {
  tip: string;
};

export function Tips({ tip }: Props) {
  return (
    <div className={styles.container}>
      <img src={iconTip} alt="Ícone de dica" />

      <div>
        <h3>Dica</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
}
