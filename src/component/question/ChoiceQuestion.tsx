import { MultiChoiceProps, SingleChoiceProps } from "@/interface/questionDto";
import { ISurvayQuestionsType } from "@/interface/survayDro";

type ChoiceQuestionProps = SingleChoiceProps | MultiChoiceProps;

const ChoiceQuestion = ({ type, options, selected, onChange }: ChoiceQuestionProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option, index) => {
        const isSelected = type === 1 ? selected === option.text : (selected as string[]).includes(option.text!);

        return (
          <div key={option.code} className="flex items-center gap-2 w-full sm:w-[calc(50%-0.5rem)]">
            {type === 1 ? (
              <>
                <div className={`w-10 h-10 flex items-center justify-center border border-gray-400 rounded-l-xl ${isSelected ? "bg-red-500 text-white" : "text-gray-700"}`}>{index + 1}</div>
                <input type="radio" id={`option-${index}`} name="option" value={option.text} className="hidden" checked={isSelected} onChange={() => onChange(option.text!)} />
                <label htmlFor={`option-${index}`} className={`flex-1 border border-gray-400 rounded-r-xl cursor-pointer flex items-center justify-center label-answer  ${isSelected ? "bg-red-500 text-white" : "text-gray-700"}`}>
                  {option.text}
                </label>
              </>
            ) : (
              <>
                <div className={`w-10 h-10 flex items-center justify-center border border-gray-400 rounded-l-md ${isSelected ? "bg-red-500 text-white" : "text-gray-700"}`}>{index + 1}</div>
                <label className={`flex-1 label-answer border border-gray-400 rounded-r-md cursor-pointer flex items-center justify-center ${isSelected ? "bg-red-500 text-white" : "text-gray-700"}`}>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        onChange((selected as string[]).filter((s) => s !== option.text));
                      } else {
                        onChange([...(selected as string[]), option.text!]);
                      }
                    }}
                  />
                  {option.text}
                </label>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceQuestion;
