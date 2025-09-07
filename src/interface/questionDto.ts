import { ISurvayQuestionsType } from "./survayDro";

export interface SingleChoiceProps {
  type: 1;
  options: ISurvayQuestionsType[];
  selected: string | string[] | undefined;
  onChange: (val: string) => void;
}

export interface MultiChoiceProps {
  type: 2;
  options: ISurvayQuestionsType[];
  selected: string | string[] | undefined;
  onChange: (val: string[]) => void;
}

export interface ImageQuestionProps {
  images: ISurvayQuestionsType[];
  selected?: string;
  onChange: (val: string) => void;
}

export interface RatingQuestionProps {
  type: 1 | 2;
  maxRate: number;
  value: number;
  onChange: (val: number) => void;
}


export interface TextQuestionProps {
  value: string;
  onChange: (val: string) => void;
}