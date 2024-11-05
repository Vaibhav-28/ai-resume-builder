import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { EducationType } from "@/type";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const formField = {
  university: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Education = () => {
  const { resumeId } = useParams();

  const [educationList, setEducationList] = useState<Array<EducationType>>([
    formField,
  ]);

  const [loading, setLoading] = useState(false);

  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationList(resumeInfo?.education);
    }
  }, []);

  const { toast } = useToast();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newEntries = [...educationList];
    const { name, value } = e.target;
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setEducationList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);

  const addNewEducation = () => setEducationList([...educationList, formField]);

  const removeEducation = () =>
    setEducationList((prevValue) => prevValue.slice(0, -1));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        education: educationList?.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Education have been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating education",
          description: error?.message,
        });
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p className="mb-5">Add your education details</p>
        <form onSubmit={handleSubmit}>
          <div>
            {educationList?.map((education, index) => {
              return (
                <div>
                  <div className="grid grid-cols-2 gap-3 border p-3 mb-5 rounded-lg">
                    <div className="col-span-2">
                      <label>University</label>
                      <Input
                        name="university"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.university}
                      />
                    </div>
                    <div>
                      <label>Degree</label>
                      <Input
                        name="degree"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.degree}
                      />
                    </div>
                    <div>
                      <label>Major</label>
                      <Input
                        name="major"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.major}
                      />
                    </div>
                    <div>
                      <label>Start Date</label>
                      <Input
                        name="startDate"
                        type="date"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.startDate}
                      />
                    </div>
                    <div>
                      <label>End Date</label>
                      <Input
                        name="endDate"
                        type="date"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.endDate}
                      />
                    </div>
                    <div className="col-span-2">
                      <label>Description</label>
                      <Textarea
                        name="description"
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={education?.description}
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
                onClick={addNewEducation}
                variant="outline"
                className="text-primary"
              >
                + Add New Education
              </Button>
              <Button
                type="button"
                onClick={removeEducation}
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

export default Education;
