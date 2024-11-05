import { Button } from "@/components/ui/button";
import Header from "@/components/ui/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { ResumeInfo } from "@/type";
import { Download, Loader2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState({} as ResumeInfo);
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();
  const { toast } = useToast();

  const getResumeInfo = () => {
    setLoading(true);
    if (resumeId) {
      GlobalApi.GetResumeById(resumeId)
        .then((res) => {
          setResumeInfo(res?.data?.data);
          setLoading(false);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error fetching resume",
            description: error?.message,
          });
        });
    }
  };

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const downloadResume = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              {loading ? "Preparing Your Resume..." : "Your Resume is Ready!"}
            </h2>
            <p className="text-gray-500 mb-12">
              {loading
                ? "Adding the finishing touches on your professional resume"
                : "Download or share your professionally crafted resume"}
            </p>
            {loading ? (
              <div className="flex flex-col items-center gap-8 mb-12 ">
                <div className="flex items-center gap-3 text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Building your resume...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                <Button
                  className="flex items-center gap-2 px-8 py-6"
                  variant="default"
                  onClick={downloadResume}
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <RWebShare
                  data={{
                    text: "Checkout my resume at AI Resume Maker by Vaibhav",
                    url: `${
                      import.meta.env.BASE_URL
                    }my-resume/s7cbouc5dzys1zlygscxzima/view`,
                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <Button
                    className="flex items-center gap-2 px-8 py-6"
                    variant="outline"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Resume
                  </Button>
                </RWebShare>
              </div>
            )}
            <div className="mt-12 w-full flex justify-center">
              {loading && (
                <div className="w-full  max-w-[8.5in] mx-auto bg-white rounded-lg shadow-lg p-8 animate-pulse">
                  <div className="space-y-6  w-full">
                    <div className="h-8 bg-gray-200 rounded w-1/3" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!loading && (
        <div id="print-area" className="mx-auto w-max mb-12 shadow-lg ">
          <ResumePreview />
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
