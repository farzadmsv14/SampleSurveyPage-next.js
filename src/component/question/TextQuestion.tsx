import { TextQuestionProps } from "@/interface/questionDto";

const TextQuestion = ({ value, onChange }: TextQuestionProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <label dir="rtl" className="block text-gray-700 font-bold mb-2">
        نظر شما :
      </label>
      <textarea dir="rtl" value={value} onChange={(e) => onChange(e.target.value)} placeholder="اینجا بنویسید... " 
      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" />
    </div>
  );
};

export default TextQuestion;
