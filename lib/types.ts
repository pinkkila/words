export type TWord = {
  id: number;
  english: string;
  finnish: string;
  correct: number;
  wrong: number;
};

export type TGptWordsPlay = {
  id: number;
  finnish: string
}