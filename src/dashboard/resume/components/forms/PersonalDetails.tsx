import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const PersonalDetails = () => {
  const { resumeId } = useParams();

  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo, setResumeInfo } = resumeContext;
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeInfo({ ...resumeInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = { data: formData };
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Save Success",
          description: "Personal details have been updated successfully",
        });
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error updating personal details",
          description: error?.message,
        });
      });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              defaultValue={resumeInfo?.firstName}
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              defaultValue={resumeInfo?.lastName}
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              defaultValue={resumeInfo?.address}
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              defaultValue={resumeInfo?.phone}
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              defaultValue={resumeInfo?.email}
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
