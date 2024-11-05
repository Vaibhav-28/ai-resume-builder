import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Skill } from "@/type";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const Skills = () => {
  const { resumeId } = useParams();

  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  const [skillsList, setSkillsList] = useState<Array<Skill>>([
    { name: "", rating: 0 },
  ]);

  useEffect(() => {
    if (resumeInfo?.skills?.length > 0) {
      setSkillsList(resumeInfo?.skills);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleChange = (
    value: string | number,
    name: string,
    index: number
  ) => {
    const newEntries = skillsList.slice();
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setSkillsList(newEntries);
  };

  const addNewSkill = () =>
    setSkillsList([...skillsList, { name: "", rating: 0 }]);

  const removeSkill = () =>
    setSkillsList((prevValue) => prevValue.slice(0, -1));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Skills have been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating skills",
          description: error?.message,
        });
      });
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your professional skills</p>
        <form onSubmit={handleSubmit}>
          <div>
            {skillsList?.map((skill, index) => {
              return (
                <div className="flex justify-between items-center border rounded-lg p-3 mb-2">
                  <div>
                    <label className="text-xs">Name</label>
                    <Input
                      className="w-full"
                      defaultValue={skill?.name}
                      onChange={(e) =>
                        handleChange(e.target.value, "name", index)
                      }
                    />
                  </div>
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={skill?.rating}
                    onChange={(value: number) =>
                      handleChange(value, "rating", index)
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={addNewSkill}
                variant="outline"
                className="text-primary"
              >
                + Add New Skill
              </Button>
              <Button
                type="button"
                onClick={removeSkill}
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

export default Skills;
