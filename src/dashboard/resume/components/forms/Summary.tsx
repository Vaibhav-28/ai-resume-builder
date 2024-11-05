import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { aiResultSummary } from "../../../../../service/AIModel";

const Summary = () => {
  const { resumeId } = useParams();
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;
  const [summary, setSummary] = useState(resumeInfo?.summary);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState(null);

  const { toast } = useToast();
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, summary });
  }, [summary]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = { data: { summary } };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Summary has been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating summary",
          description: error?.message,
        });
      });
  };

  const generateSummary = async () => {
    setLoading(true);
    const result = await aiResultSummary(
      `generate a summary for job title: ${resumeInfo?.jobTitle}, for fresher, mid level and experienced in JSON format in 3 to 4 lines for each of the experience level`
    );
    setAiGeneratedSummary(JSON.parse(result.response.text()));
    setLoading(false);
  };
  return (
    <>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job</p>
        <form className="mt-7" onSubmit={handleSubmit}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
              onClick={generateSummary}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain />
                  Generate From AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            className="mt-5"
            defaultValue={resumeInfo?.summary}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummary && (
        <div>
          <h2 className="font-bold text-lg my-4">Suggestions</h2>
          <div className="space-y-4">
            {Object.keys(aiGeneratedSummary)?.map((level, index) => {
              return (
                <div
                  className="shadow-lg p-4 border rounded-lg hover:scale-105 transition-all cursor-pointer"
                  key={index}
                  onClick={() => setSummary(aiGeneratedSummary[level])}
                >
                  <h2 className="font-bold my-1 text-primary">
                    Level: {level}
                  </h2>
                  <p>{aiGeneratedSummary[level]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
