import { TWord } from "@/lib/types";
import * as SQLite from "expo-sqlite";
import { createContext, ReactNode, useEffect, useState } from "react";

type WordsContext = {
  words: TWord[] | null;
  saveToDb: (english: string, finnish: string) => void;
  handleDelete: (id: number) => void; 
  handleCorrectOrWrong: (id: number, delta: number) => void;
}

export const WordsContext = createContext<WordsContext | null>(null);

export default function WordsContextProvider({ children }: {children: ReactNode}) {
  const db = SQLite.openDatabaseSync('wordgame.db');
  const [words, setWords] = useState<null | TWord[]>([]);

  useEffect(() => {
    initialize()
  }, []);

  const initialize = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS word (id INTEGER PRIMARY KEY NOT NULL, english TEXT NOT NULL, finnish TEXT NOT NULL, correct INTEGER NOT NULL, wrong INTEGER NOT NULL);
      `);
      await getWordsFromDb();
    } catch (error) {
      console.error('Could not initialize database', error);
    }
  }

  const getWordsFromDb = async () => {
    try {
      const wordsFormDb = await db.getAllAsync<TWord>("SELECT * from word;");
      setWords(wordsFormDb);
    } catch (error) {
      console.error("Fail when getting words from db");
    }
  };

  const saveToDb = async (english: string, finnish: string) => {
    try {
      await db.runAsync(
        `INSERT INTO word (english, finnish, correct, wrong) VALUES (?, ?, ?, ?)`,
        english,
        finnish,
        0,
        0
      );
      await getWordsFromDb();
    } catch (error) {
      console.error("Fail when saving word", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM word WHERE id=?", id);
      await getWordsFromDb();
    } catch (error) {
      console.error("Fail when deleting word", error);
    }
  };

  const handleCorrectOrWrong = async (id: number, delta: number) => {
    if (delta === 1) {
      try {
        await db.runAsync("UPDATE word SET correct = correct + 1 WHERE id = ?", id )
      } catch (error) {
        console.error("Fail when updating word's correct field")
      }
    }

    if (delta === -1) {
      try {
        await db.runAsync("UPDATE word SET wrong = wrong + 1 WHERE id = ?", id)
      } catch (error) {
        console.error("Fail when updating word's wrong field")
      }
    }

    await getWordsFromDb()

  }

  const handleEditWord = async (item: TWord ) => {

  }

  return (
      <WordsContext.Provider value={{words, saveToDb, handleDelete, handleCorrectOrWrong}}>
        {children}
      </WordsContext.Provider>
  );
}

