import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { ExperienceType } from "@/type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const formField = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  workSummary: "",
  currentlyWorking: false,
};

type CheckedState = boolean | "indeterminate";

const Experience = () => {
  const { resumeId } = useParams();

  const [experienceList, setExperienceList] = useState<Array<ExperienceType>>([
    formField,
  ]);

  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo?.experience);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEntries = [...experienceList];
    const { name, value } = e.target;
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setExperienceList(newEntries);
  };

  const handleRichTextEditor = (value: string, name: string, index: number) => {
    const newEntries = [...experienceList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setExperienceList(newEntries);
  };

  const handleChecboxChange = (
    checked: CheckedState,
    name: string,
    index: number
  ) => {
    const newEntries = [...experienceList];
    if (checked === true) {
      newEntries[index] = {
        ...newEntries[index],
        [name]: checked,
      };
    } else {
      newEntries[index] = {
        ...newEntries[index],
        [name]: false,
      };
    }
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);

  const addNewExperience = () =>
    setExperienceList([...experienceList, formField]);
  const removeExperience = () =>
    setExperienceList((prevValue) => prevValue.slice(0, -1));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: { experience: experienceList?.map(({ id, ...rest }) => rest) },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Experience has been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating experince",
          description: error?.message,
        });
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p className="mb-5">Add your previous job experience</p>
        <form onSubmit={handleSubmit}>
          <div>
            {experienceList?.map((experience, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-2 gap-3 border p-3 mb-5 rounded-lg">
                    <div>
                      <label className="text-xs ">Position Title</label>
                      <Input
                        name="title"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={experience?.title}
                      />
                    </div>
                    <div>
                      <label className="text-xs ">Company</label>
                      <Input
                        name="company"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={experience?.company}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs ">Location</label>
                      <Input
                        name="location"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={experience?.location}
                      />
                    </div>
                    <div>
                      <label className="text-xs ">Start Date</label>
                      <Input
                        type="date"
                        name="startDate"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={experience?.startDate}
                      />
                    </div>
                    <div>
                      <label className="text-xs">End Date</label>
                      <Input
                        type="date"
                        name="endDate"
                        onChange={(e) => handleInputChange(e, index)}
                        disabled={experience?.currentlyWorking}
                        defaultValue={experience.endDate}
                      />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={`current-position-${index}`}
                        checked={experience?.currentlyWorking}
                        onCheckedChange={(checked) =>
                          handleChecboxChange(
                            checked,
                            "currentlyWorking",
                            index
                          )
                        }
                      />
                      <Label
                        htmlFor={`current-position-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This is my current position
                      </Label>
                    </div>
                    <div className="col-span-2">
                      <RichTextEditor
                        defaultValue={experience?.workSummary}
                        index={index}
                        onRichTextEditorChange={(value) =>
                          handleRichTextEditor(value, "workSummary", index)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={addNewExperience}
                variant="outline"
                className="text-primary"
              >
                + Add More Experience
              </Button>
              <Button
                type="button"
                onClick={removeExperience}
                variant="outline"
                className="text-primary"
              >
                - Remove
              </Button>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;
