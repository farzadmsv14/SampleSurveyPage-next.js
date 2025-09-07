import Survay from "@/component/survay";
import { Metadata } from "next";

export const metadata: Metadata = { title: "", description: "", keywords: "" };

export default function Home() {
  return <Survay />;
}
