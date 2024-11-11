import { ResumeInfo } from "@/type";

interface AdditionalInformationPreviewProps {
  resumeInfo: ResumeInfo;
}

const AdditionalInformationPreview = ({
  resumeInfo,
}: AdditionalInformationPreviewProps) => {
  return (
    <>
      {resumeInfo?.additionalInformation && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Additional Information
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />

          <div className="my-5">
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{
                __html: resumeInfo?.additionalInformation,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalInformationPreview;
