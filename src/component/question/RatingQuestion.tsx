import { RatingQuestionProps } from "@/interface/questionDto";

const RatingQuestion = ({ type, maxRate, value, onChange }: RatingQuestionProps) => {
  if (type === 1) {
    return (
      <div className="w-full max-w-xl">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-bold"> امتیاز: {value}</span>
          <span className="text-gray-500">از {maxRate}</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxRate}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-4 rounded-lg appearance-none cursor-pointer transition-all"
          style={{
            background: `linear-gradient(to right, #fb2c36 0%, #fb2c36 ${(value / maxRate) * 100}%, #d1d5db ${(value / maxRate) * 100}%, #d1d5db 100%)`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
      {Array.from({ length: maxRate }, (_, index) => index + 1).map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} className={`transition-colors text-6xl lg:text-7xl ${star <= value ? "text-red-500" : "text-gray-300"}`}>
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingQuestion;
