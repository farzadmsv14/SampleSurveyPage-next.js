import { ImageQuestionProps } from "@/interface/questionDto";
import { env } from "process";

const ImageQuestion = ({ images, selected, onChange }: ImageQuestionProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <label key={index} className={`relative border-2 rounded-lg p-1 cursor-pointer overflow-hidden ${selected === image.imageId ? "border-red-500 shadow-lg" : "border-gray-300"} hover:border-red-400 hover:shadow-md transition-all`}>
          <input type="radio" name="imageOption" value={image.imageId} className="hidden" onChange={() => onChange(image.imageId!)} />
          <div className="w-32 h-32 flex items-center justify-center rounded-lg overflow-hidden">
            <img src={image.imageId} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
            {/* <img src={`${env.gatewayUrl}` + " /FileManager/Thumbnail/" + image.imageId} alt={`Option ${index + 1}`} className="w-full h-full object-cover" /> */}
          </div>
          {selected === image.imageId && <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">انتخاب شده</span>}
        </label>
      ))}
    </div>
  );
};

export default ImageQuestion;
