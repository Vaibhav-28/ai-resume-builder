import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillPreview from "./preview/SkillPreview";
import ProjectsPreview from "./preview/ProjectsPreview";
import AdditionalInformationPreview from "./preview/AdditionalInformationPreview";

const ResumePreview = () => {
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo } = resumeContext;
  return (
    <div
      className="w-full max-w-[8.5in] bg-white h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      <ExperiencePreview resumeInfo={resumeInfo} />
      <ProjectsPreview resumeInfo={resumeInfo} />
      <EducationPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />
      <AdditionalInformationPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
