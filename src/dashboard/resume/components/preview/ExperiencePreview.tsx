import { ResumeInfo } from "@/type";

interface PersonalDetailPreviewProps {
  resumeInfo: ResumeInfo;
}

const ExperiencePreview = ({ resumeInfo }: PersonalDetailPreviewProps) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((exp, index) => {
        return (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {exp?.title}
            </h2>
            <h2 className="text-xs flex justify-between">
              {exp?.company}
              {exp?.location && ", "}
              {exp?.location}
              <span>
                {exp?.startDate}
                {exp?.startDate &&
                  (exp?.currentlyWorking || exp?.endDate) &&
                  " - "}
                {exp?.startDate &&
                  (exp?.currentlyWorking ? "Present" : exp?.endDate)}
              </span>
            </h2>
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExperiencePreview;
