import { ResumeInfo } from "@/type";

interface ProjectsPreviewProps {
  resumeInfo: ResumeInfo;
}

const ProjectsPreview = ({ resumeInfo }: ProjectsPreviewProps) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.projects?.map((project, index) => {
        return (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold flex justify-between"
              style={{ color: resumeInfo?.themeColor }}
            >
              {project?.title}
              <span className="text-xs font-normal text-black">
                {project?.startDate}
                {project?.startDate &&
                  (project?.currentlyWorking || project?.endDate) &&
                  " - "}
                {project?.startDate &&
                  (project?.currentlyWorking ? "Present" : project?.endDate)}
              </span>
            </h2>
            <p className="text-xs my-2">{project?.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsPreview;
