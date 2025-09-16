"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getSurvay, submitAnswer } from "@/servise/survayServise";
import { AnswerPayload, ISurvayQuestion, ISurvayQuestionsType } from "@/interface/survayDro";
import TextQuestion from "./question/TextQuestion";
import ChoiceQuestion from "./question/ChoiceQuestion";
import RatingQuestion from "./question/RatingQuestion";
import ImageQuestion from "./question/ImageQuestion";

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
};

const Survay = () => {
  const [survayDetailData, setSurvayDetailData] = useState<ISurvayQuestionsType[]>([]);
  const [showPage, setShowPage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [i, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [selected2, setSelected2] = useState<string | undefined>(undefined);
  const [selected3, setSelected3] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState(50);
  const [text, setText] = useState<string>("");

  const images = [
    {
      id: "1",
      code: 1008,
      imageId: "i1.png",
      name: "download (3).jpg",
      order: 2,
      creationDateTime: "string",
      creationDatePersian: "string",
      creationTimePersian: "string",
    },
    {
      id: "2",
      code: 1008,
      imageId: "i2.png",
      name: "download (3).jpg",
      order: 2,
      creationDateTime: "string",
      creationDatePersian: "string",
      creationTimePersian: "string",
    },

    {
      id: "3",
      code: 1008,
      imageId: "i3.png",
      name: "download (3).jpg",
      order: 2,
      creationDateTime: "string",
      creationDatePersian: "string",
      creationTimePersian: "string",
    },

    {
      id: "4",
      code: 1008,
      imageId: "i4.png",
      name: "download (3).jpg",
      order: 2,
      creationDateTime: "string",
      creationDatePersian: "string",
      creationTimePersian: "string",
    },
  ];

  useEffect(() => {
    getSurvay("1").then((data) => {
      const detailedData: ISurvayQuestion[] = data;

      const mappedArray1 = detailedData[0].choiseQuestions.map((item: any) => ({
        ...item,
        questionType: "choiseQuestions",
      }));
      const mappedArray2 = detailedData[0].textQuestions.map((item: any) => ({
        ...item,
        questionType: "textQuestions",
      }));
      const mappedArray3 = detailedData[0].ratingQuestions.map((item: any) => ({
        ...item,
        questionType: "ratingQuestions",
      }));
      const mappedArray4 = detailedData[0].imageQuestions.map((item: any) => ({
        ...item,
        questionType: "imageQuestions",
      }));

      const surveyList = [...mappedArray1, ...mappedArray2, ...mappedArray3, ...mappedArray4];
      setSurvayDetailData(surveyList);
    });
  }, []);

  const totalSteps = survayDetailData?.length || 0;
  const progressPercent = (currentStep / totalSteps) * 100;
  const currentQuestion = survayDetailData?.[i];

  const initializeQuestionState = (question: ISurvayQuestionsType) => {
    setSelected(question.questionType === "choiseQuestions" && question.type === 1 ? (question.answer as string) ?? undefined : undefined);
    setSelected3(question.questionType === "choiseQuestions" && question.type === 2 ? (question.answer as string[]) ?? [] : []);
    setSelected2(question.questionType === "imageQuestions" ? (question.answer as string) ?? undefined : undefined);
    setText(question.questionType === "textQuestions" ? (question.answer as string) ?? "" : "");
    setRating(question.questionType === "ratingQuestions" && question.type === 2 ? (question.answer as number) ?? 0 : 0);
    setValue(question.questionType === "ratingQuestions" && question.type === 1 ? (question.answer as number) ?? 50 : 50);
  };

  const handleNext = async () => {
    if (!currentQuestion) return;
    let answer: string | number | string[] = "";
    if (currentQuestion.questionType === "ratingQuestions" && currentQuestion.type === 1) answer = value;
    else if (currentQuestion.questionType === "ratingQuestions" && currentQuestion.type === 2) answer = rating;
    else if (currentQuestion.questionType === "choiseQuestions" && currentQuestion.type === 1) answer = selected ?? "";
    else if (currentQuestion.questionType === "choiseQuestions" && currentQuestion.type === 2) answer = selected3 ?? [];
    else if (currentQuestion.questionType === "imageQuestions") answer = selected2 ?? "";
    else if (currentQuestion.questionType === "textQuestions") answer = text ?? "";

    const newData = [...survayDetailData];
    newData[i] = { ...newData[i], answer };
    setSurvayDetailData(newData);

    try {
      const payload: AnswerPayload = {
        survayId: 1,
        questionId: currentQuestion.id,
        answer,
      };

      // await submitAnswer(payload);
      console.log(payload);

      if (currentStep < totalSteps) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
        setIndex((prev) => prev + 1);
        const nextQuestion = survayDetailData[i + 1];
        if (nextQuestion) initializeQuestionState(nextQuestion);
      } else {
        setIsFinished(true);
      }
    } catch (err) {
      console.error("خطا پاسخ :", err);
    }
  };

  const handlePrev = () => {
    if (i === 0) return;
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setIndex((prev) => prev - 1);
    const prevQuestion = survayDetailData[i - 1];
    if (prevQuestion) initializeQuestionState(prevQuestion);
  };

  const isNextDisabled = (() => {
    if (!currentQuestion) return false;
    if (currentQuestion.questionType === "ratingQuestions") return false;
    if (currentQuestion.questionType === "choiseQuestions" && currentQuestion.type === 1) return selected === undefined;
    if (currentQuestion.questionType === "choiseQuestions" && currentQuestion.type === 2) return selected3.length === 0;
    if (currentQuestion.questionType === "imageQuestions") return !selected2;
    if (currentQuestion.questionType === "textQuestions") return text.trim().length === 0;
    return false;
  })();

  if (!showPage) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-between overflow-auto pt-10">
        <div>
          <p className="text-4xl mb-8 text-center">خوش آمدید</p>
          <p className="text-xl mb-8 text-center">شرکت مایان پیشرو در زمینه خودرو سازی...</p>
        </div>
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg nextPrev transform transition active:scale-110 duration-150 ease-in-out active:rotate-2" onClick={() => setShowPage(true)}>
          شروع
        </button>
        <img src="image/preview-2-e1748504278191.png" alt="Survey photo" />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-between py-10">
        <div>
          <p className="text-4xl mb-8 text-center">با تشکر</p>
          <p className="text-xl mb-8 text-center">شرکت مایان پیشرو در زمینه خودرو سازی...</p>
        </div>
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg nextPrev transform transition active:scale-110 duration-150 ease-in-out active:rotate-2" onClick={() => (window.location.href = "http://mayangroups.ir/")}>
          بازگشت به سایت
        </button>
        <img src="image/evaluate-cx.png" alt="Survey photo" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-between flex-col-reverse lg:flex-row">
      <div className="lg:w-1/2 p-4">
        <section className="flex flex-col justify-between w-full h-full">
          <div className="flex items-center justify-center w-full">
            <div className="hidden lg:block">
              <img src="image/dima1.png" alt="Photo of Dima's truck" />
            </div>
          </div>

          <div className="flex justify-between w-full space-x-4">
            <button className={`px-6 py-2 rounded-lg nextPrev transform transition active:scale-110 duration-150 ease-in-out active:rotate-2 ${i === 0 ? "opacity-0 scale-95 pointer-events-none" : "bg-red-500 text-white"}`} disabled={i === 0} onClick={handlePrev}>
              سوال قبلی
            </button>
            <button className={`px-6 py-2 rounded-lg nextPrev transform transition active:scale-110 duration-150 ease-in-out active:rotate-1 ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`} onClick={handleNext} disabled={isNextDisabled}>
              سوال بعدی
            </button>
          </div>
        </section>
      </div>

      <div className="lg:w-1/2 p-4 flex flex-col items-center justify-between overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={i} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }} className="w-full flex flex-col items-center">
            <div className="relative inline-block overflow-hidden mb-10">
              <img src="image/QBG.png" alt="question photo" />
              <motion.span dir="rtl" className="absolute top-[41%] left-[54%] -translate-x-1/2 -translate-y-1/2 text-black font-bold text-xl sm:text-2xl w-78 text-center">
                {currentQuestion?.text}
              </motion.span>
            </div>

            {currentQuestion?.questionType === "textQuestions" && <TextQuestion key="text" value={text} onChange={setText} />}
            {currentQuestion?.questionType === "choiseQuestions" && currentQuestion.type === 1 && <ChoiceQuestion key="choice-single" type={1} options={currentQuestion.options!} selected={selected} onChange={setSelected} />}
            {currentQuestion?.questionType === "choiseQuestions" && currentQuestion.type === 2 && <ChoiceQuestion key="choice-multi" type={2} options={currentQuestion.options!} selected={selected3} onChange={setSelected3} />}
            {currentQuestion?.questionType === "ratingQuestions" && <RatingQuestion key="rating" type={currentQuestion.type!} maxRate={currentQuestion.maxRate!} value={currentQuestion.type === 1 ? value : rating} onChange={currentQuestion.type === 1 ? setValue : setRating} />}
            {currentQuestion?.questionType === "imageQuestions" && <ImageQuestion key="image" images={images} selected={selected2} onChange={setSelected2} />}
          </motion.div>
        </AnimatePresence>
        <div className="w-full mt-10 max-w-xl hidden lg:block">
          <div className="w-full h-4 bg-gray-300 overflow-hidden">
            <div className="h-4 bg-red-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survay;
