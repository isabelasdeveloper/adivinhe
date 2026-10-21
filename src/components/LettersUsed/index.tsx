import styles from "./styles.module.css";

import { Letters } from "../Letters";

export type LettersUsedProps = {
  value: string;
  check: boolean;
};

type Props = {
  data: LettersUsedProps[];
};

export function LettersUsed({ data }: Props) {
  return (
    <div className={styles.container}>
      <h5>Letras Utilizadas</h5>

      <div className={styles.lettersBox}>
        {data.map(({ value, check }) => (
          <Letters
            key={value}
            value={value}
            variant="small"
            color={check ? "right" : "wrong"}
          />
        ))}
      </div>
    </div>
  );
}
