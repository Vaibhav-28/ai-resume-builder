import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import RichTextEditor from "../RichTextEditor";

const Summary = () => {
  const { resumeId } = useParams();
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;
  const [additionalInformation, setAdditionalInformation] = useState(
    resumeInfo?.additionalInformation
  );
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, additionalInformation });
  }, [additionalInformation]);

  const handleRichTextEditor = (value: string) => {
    setAdditionalInformation(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = { data: { additionalInformation } };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Additional Information has been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating additonal information",
          description: error?.message,
        });
      });
  };

  return (
    <>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Additonal Information</h2>
        <p>Add additional information</p>
        <form className="mt-7" onSubmit={handleSubmit}>
          <RichTextEditor
            general={true}
            defaultValue={resumeInfo?.additionalInformation}
            onRichTextEditorChange={(value) => handleRichTextEditor(value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Summary;
