import { Button } from "@/components/ui/button";
import PersonalDetails from "./forms/PersonalDetails";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useCallback, useContext, useRef, useState } from "react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Navigate, useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import Projects from "./forms/Projects";
import AdditionalInformation from "./forms/AdditionalInformation";

const FormSection = () => {
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { resumeId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeout = useRef<any>(null);

  const { toast } = useToast();

  const callApi = useCallback(
    (selectedColor: string) => {
      const data = {
        data: {
          themeColor: selectedColor,
        },
      };
      GlobalApi.UpdateResumeDetail(resumeId, data)
        .then((res) => {
          console.log(res);
          toast({
            title: "Save Success",
            description: "Theme color updated in the database",
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error updating theme color",
            description: error?.message,
          });
        });
    },
    [resumeId, toast]
  );

  const debounceApiCall = useCallback(
    (selectedColor: string) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => callApi(selectedColor), 1000); // 500ms debounce
    },
    [callApi]
  );

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setResumeInfo({ ...resumeInfo, themeColor: color });
    debounceApiCall(color);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            document?.getElementById("colorInput")?.click();
          }}
          variant="outline"
          className="flex gap-2"
          size="sm"
        >
          <LayoutGrid /> Theme
        </Button>
        <input
          className="m-10"
          type="color"
          id="colorInput"
          value={resumeInfo?.themeColor}
          onChange={handleColorChange}
          style={{ display: "none" }}
        />

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex((prevState) => prevState - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < 8 && (
            <Button
              onClick={() => setActiveFormIndex((prevState) => prevState + 1)}
              className="flex gap-2"
              size="sm"
            >
              <ArrowRight /> Next
            </Button>
          )}
        </div>
      </div>
      {activeFormIndex === 1 && <PersonalDetails />}
      {activeFormIndex === 2 && <Summary />}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Projects />}
      {activeFormIndex === 5 && <Education />}
      {activeFormIndex === 6 && <Skills />}
      {activeFormIndex === 7 && <AdditionalInformation />}
      {activeFormIndex === 8 && <Navigate to={`/my-resume/${resumeId}/view`} />}
    </div>
  );
};

export default FormSection;
