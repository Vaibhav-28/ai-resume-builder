/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data: any) => axiosClient.post("/user-resumes", data);

const GetUserResumes = (email: string | undefined) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + email);

const GetResumeById = (id: string) =>
  axiosClient.get(`/user-resumes/${id}?populate=*`);

const UpdateResumeDetail = (id: string | undefined, data: any) =>
  axiosClient.put("/user-resumes/" + id, data);

const DeleteResumeById = (id: string) =>
  axiosClient.delete(`/user-resumes/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};
