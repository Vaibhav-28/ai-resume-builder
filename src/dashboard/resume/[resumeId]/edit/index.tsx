import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useCallback, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { ResumeInfo } from "@/type";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo>({} as ResumeInfo);
  const { toast } = useToast();
  const getResumeInfo = useCallback(() => {
    if (resumeId) {
      GlobalApi.GetResumeById(resumeId)
        .then((res) => {
          setResumeInfo(res.data.data);
        })
        .catch((error: AxiosError) => {
          toast({
            variant: "destructive",
            title: "Error fetching resume",
            description: error?.message,
          });
        });
    }
  }, [resumeId, toast]);
  useEffect(() => {
    getResumeInfo();
  }, [getResumeInfo]);
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <div className="shadow-lg">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
