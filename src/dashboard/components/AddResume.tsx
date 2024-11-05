import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddResume = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/resume/${res?.data?.data?.documentId}/edit`);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error creating resumes",
          description: error?.message,
        });
        setLoading(false);
      });
  };
  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="group relative h-[280px] rounded-xl cursor-pointer overflow-hidden"
      >
        {/* Dashed border container with gradient animation */}
        <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 group-hover:from-[#4a5568] group-hover:via-blue-400 group-hover:to-[#4a5568] transition-all duration-500">
          <div className="h-full w-full bg-white dark:bg-gray-900 rounded-xl" />
        </div>

        {/* Main content container */}
        <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#4a5568]/10 to-transparent rounded-full transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-[#4a5568]/10 to-transparent rounded-full transform -translate-x-20 translate-y-20" />
          </div>

          {/* Icon container */}
          <div className="relative">
            <div className="p-3 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-[#4a5568] transition-colors duration-300">
              <div className="p-4 bg-gray-50 group-hover:bg-[#4a5568]/5 rounded-lg transition-colors duration-300">
                <Plus
                  size={32}
                  className="text-gray-400 group-hover:text-[#4a5568] group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute -inset-2 bg-[#4a5568]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Text content */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-600 group-hover:text-[#4a5568] transition-colors duration-300">
              Create New Resume
            </h3>
            <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-500 transition-colors duration-300">
              Click to get started
            </p>
          </div>

          {/* Pulse animation */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[#4a5568]/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-80 md:w-96 lg:w-full rounded-md">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your resume</p>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="my-2"
                placeholder="Ex. Full Stack Resume"
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
