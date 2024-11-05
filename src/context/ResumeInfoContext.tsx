import { ResumeInfo } from "@/type";
import { createContext } from "react";

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
}

export const ResumeInfoContext = createContext<ResumeInfoContextType | null>(
  null
);
