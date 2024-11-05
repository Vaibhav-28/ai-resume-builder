import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Award,
  Download,
  Edit,
  Loader2,
  Menu,
  Trash,
  View,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import GlobalApi from "../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface Resume {
  createdAt: string;
  documentId: string;
  id: number;
  publishedAt: string;
  resumeId: string;
  title: string;
  updatedAt: string;
  userEmail: string;
  userName: string;
}
interface ResumeCardProps {
  resume: Resume;
  refreshData: () => void;
}
const ResumeCard = ({ resume, refreshData }: ResumeCardProps) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const deleteResume = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume?.documentId)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          title: "Delete Success",
          description: "Resume has been succesfully deleted",
        });
        setOpenAlert(false);
        refreshData();
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error deleting resume",
          description: err?.message,
        });
      });
  };

  return (
    <Link to={`/dashboard/resume/${resume?.documentId}/edit`}>
      <div className="group">
        <div className="relative p-8 rounded-xl bg-gradient-to-br from-[#4a5568] to-[#2d3748] flex flex-col items-center justify-center h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400 to-transparent rounded-full transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-400 to-transparent rounded-full transform -translate-x-20 translate-y-20" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 mb-4 group-hover:scale-105 transition-transform duration-300">
            <div className="p-4 bg-white rounded-full shadow-lg group-hover:shadow-white/20">
              <Award
                size={40}
                className="text-[#4a5568] group-hover:text-blue-600 transition-colors duration-300"
              />
            </div>
            <div className="absolute -inset-2 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="z-20 absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className=" z-20 cursor-pointer group">
                  <div className="flex flex-col items-center justify-center p-1 bg-[#2d3748] rounded-full shadow transition-transform duration-300 hover:scale-110">
                    <Menu
                      className="text-white hover:text-blue-600 transition-colors duration-300"
                      size={20}
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/resume/${resume?.documentId}/edit`);
                  }}
                >
                  <Edit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/my-resume/${resume?.documentId}/view`);
                  }}
                >
                  <View />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/my-resume/${resume?.documentId}/view`);
                  }}
                >
                  <Download />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAlert(true);
                  }}
                >
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h2 className="relative z-10 text-lg text-center font-medium text-white mt-2 group-hover:scale-105 transition-transform duration-300">
            {resume?.title || "Untitled Resume"}
          </h2>

          <span className="relative z-10 text-sm text-gray-300 mt-2 opacity-80">
            Click to edit
          </span>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AlertDialog open={openAlert}>
            <AlertDialogOverlay className="bg-black/10" />
            <AlertDialogContent className="w-80 md:w-96 lg:w-full rounded-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this resume.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction disabled={loading} onClick={deleteResume}>
                  {loading ? <Loader2 className="animate-spin" /> : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
