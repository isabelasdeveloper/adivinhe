import styles from "./App.module.css";
import { WORDS, type Challenge } from "./utils/words";

import { Header } from "./components/Header";
import { Tips } from "./components/Tips";
import { Letters } from "./components/Letters";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";

import { useEffect, useState } from "react";

export function App() {
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);

  function restartGame() {
    startGame();
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);
    setLetter("");
    setScore(0);
    setLettersUsed([]);
  }

  function handleCheck() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toUpperCase();

    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value,
    );

    if (exists) {
      setLetter("");
      return alert("Você já tentou essa " + value);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const check = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, check }]);
    setLetter("");
    setScore(currentScore);
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns!");
      }

      if (lettersUsed.length === MAX_ATTEMPTS) {
        return endGame("Falhou :(");
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  let MAX_ATTEMPTS = challenge.word.length + 3;

  const letters = challenge.word.split("").map((char, index) => {
    const letterUsed = lettersUsed.find(
      (used) => used.value.toUpperCase() === char.toUpperCase(),
    );

    return (
      <Letters
        key={index}
        value={letterUsed?.value}
        color={letterUsed?.check ? "right" : "default"}
      />
    );
  });

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={MAX_ATTEMPTS}
          onRestart={restartGame}
        />
        <Tips tip={challenge.tip} />

        <div className={styles.word}>{letters}</div>

        <h4>Palpite</h4>
        <div className={styles.inputBox}>
          <Input
            autoFocus
            maxLength={1}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Enviar" onClick={handleCheck} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}
