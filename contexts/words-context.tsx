import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

type TWord = {
  id: number;
  english: string;
  finnish: string;
  correct: number;
  wrong: number;
};

type WordsContext = {
  words: TWord[] | null;
  saveToDb: (english: string, finnish: string) => void;
  handleDelete: (id: number) => void; 
}

export const WordsContext = createContext<WordsContext | null>(null);

export default function WordsContextProvider({ children }: {children: ReactNode}) {
  const initialize = async (db: SQLite.SQLiteDatabase) => {
    db.runAsync(`
      CREATE TABLE IF NOT EXISTS word (id INTEGER PRIMARY KEY NOT NULL, english TEXT NOT NULL, finnish TEXT NOT NULL, correct INTEGER NOT NULL, wrong INTEGER NOT NULL);
      `);
  };
  const db = useSQLiteContext();
  const [words, setWords] = useState<null | TWord[]>([]);

  useEffect(() => {
    getWordsFromDb();
  }, []);

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

  return (
    <SQLiteProvider
      databaseName="wordgame.db"
      onInit={initialize}
      onError={(error) => console.error("Could not open database", error)}
    >
      <WordsContext.Provider value={{words, saveToDb, handleDelete}}>
        {children}
      </WordsContext.Provider>
    </SQLiteProvider>
  );
}

