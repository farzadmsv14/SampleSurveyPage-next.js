import axios from "axios";
import env from "@/environment";

const getSurvay = async (id: string) => {
  try {
    // const response = await axios.get("${env.apiBaseUrl}/api/survay" + id);
    const response = await axios.get(`${env.apiBaseUrl}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

interface AnswerPayload {
  questionId: number | string;
  answer: any;
}

const submitAnswer = async (payload: AnswerPayload) => {
  try {
    const response = await axios.post(`${env.gatewayUrl}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("submitAnswer error:", error.response?.data || error.message);
    throw error;
  }
};

export { getSurvay, submitAnswer };
