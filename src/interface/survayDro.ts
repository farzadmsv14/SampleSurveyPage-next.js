export interface ISurvayQuestion {
  choiseQuestions: ISurvayQuestionsType[];
  textQuestions: ISurvayQuestionsType[];
  ratingQuestions: ISurvayQuestionsType[];
  imageQuestions: ISurvayQuestionsType[];
}

export interface ISurvayQuestionsType {
  minRate?: number;
  maxRate?: number;
  type?: 1 | 2;
  imageId?: string;
  answer?: any;
  questionType?: string;
  options?: ISurvayQuestionsType[];
  images?: ISurvayQuestionsType[];
  text?: string;
  code: number;
  order: number;
  id: string;
  name?: string;
  creationDateTime: string;
  creationDatePersian: string;
  creationTimePersian: string;
}

export interface AnswerPayload {
  survayId: string | number;
  questionId: string | number;
  answer: string | string[] | number;
}

