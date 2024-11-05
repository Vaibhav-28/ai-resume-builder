import { ResumeInfo } from "@/type";

interface PersonalDetailPreviewProps {
  resumeInfo: ResumeInfo;
}

const SummaryPreview = ({ resumeInfo }: PersonalDetailPreviewProps) => {
  return (
    <>
      <p className="text-xs">{resumeInfo?.summary}</p>
    </>
  );
};

export default SummaryPreview;
