import { ResumeInfo } from "@/type";

interface PersonalDetailPreviewProps {
  resumeInfo: ResumeInfo;
}

const SkillPreview = ({ resumeInfo }: PersonalDetailPreviewProps) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="flex flex-col gap-3 my-4">
        {resumeInfo?.skills?.map((skill, index) => {
          return (
            <div key={index} className="flex items-baseline justify-between">
              <h2 className="text-xs">{skill?.name}</h2>
              {skill?.name && (
                <div className="relative border-t-8 border-gray-200 w-[120px]">
                  <div
                    className="absolute top-[-8px] left-0 border-t-8"
                    style={{
                      borderColor: resumeInfo?.themeColor || "#008080",
                      width: `${skill?.rating * 20}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillPreview;
