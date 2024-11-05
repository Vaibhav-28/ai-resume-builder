import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCard from "./components/ResumeCard";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

const SkeletonCard = () => (
  <div className="relative h-[280px] rounded-xl overflow-hidden animate-pulse">
    <div className="absolute inset-0 p-[1px] rounded-xl bg-gray-200">
      <div className="h-full w-full bg-gray-100 rounded-xl">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="w-32 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const getResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setResumeList(res?.data?.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading resumes",
          description: err?.message,
        });
      });
  };
  useEffect(() => {
    if (user) getResumesList();
  }, [user]);
  return (
    <div className="p-10 md:px-10 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating Resume with AI for your next job role</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
        {!loading &&
          resumeList?.map((resume, index) => (
            <ResumeCard
              refreshData={getResumesList}
              resume={resume}
              key={index}
            />
          ))}
        {!loading && resumeList?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center p-8">
            <div className="mb-4 p-4 bg-gray-100 rounded-full">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No Resumes Yet
            </h3>
            <p className="text-gray-500 mt-1">
              Click the plus button to create your first resume
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
