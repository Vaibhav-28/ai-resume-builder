import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { ProjectsType } from "@/type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formField = {
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  currentlyWorking: false,
};

type CheckedState = boolean | "indeterminate";

const Experience = () => {
  const { resumeId } = useParams();

  const [projectsList, setProjectsList] = useState<Array<ProjectsType>>([
    formField,
  ]);

  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectsList(resumeInfo?.projects);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newEntries = [...projectsList];
    const { name, value } = e.target;
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setProjectsList(newEntries);
  };

  const handleChecboxChange = (
    checked: CheckedState,
    name: string,
    index: number
  ) => {
    const newEntries = [...projectsList];
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
    setProjectsList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, projects: projectsList });
  }, [projectsList]);

  const addNewExperience = () => setProjectsList([...projectsList, formField]);
  const removeExperience = () =>
    setProjectsList((prevValue) => prevValue.slice(0, -1));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: { projects: projectsList?.map(({ id, ...rest }) => rest) },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Projects have been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating projects",
          description: error?.message,
        });
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p className="mb-5">Add your projects</p>
        <form onSubmit={handleSubmit}>
          <div>
            {projectsList?.map((project, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-2 gap-3 border p-3 mb-5 rounded-lg">
                    <div className="col-span-2">
                      <label className="text-xs ">Project Title</label>
                      <Input
                        name="title"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={project?.title}
                      />
                    </div>
                    <div>
                      <label className="text-xs ">Start Date</label>
                      <Input
                        type="date"
                        name="startDate"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={project?.startDate}
                      />
                    </div>
                    <div>
                      <label className="text-xs">End Date</label>
                      <Input
                        type="date"
                        name="endDate"
                        onChange={(e) => handleInputChange(e, index)}
                        disabled={project?.currentlyWorking}
                        defaultValue={project.endDate}
                      />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={`current-position-${index}`}
                        checked={project?.currentlyWorking}
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
                        Currently ongoing
                      </Label>
                    </div>
                    <div className="col-span-2">
                      <label>Description</label>
                      <Textarea
                        name="description"
                        onChange={(e) => handleInputChange(e, index)}
                        defaultValue={project?.description}
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
                + Add Another Project
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
