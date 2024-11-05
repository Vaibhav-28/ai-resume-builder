import Header from "@/components/ui/custom/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Create Professional Resumes with AI
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Build standout resumes effortlessly with AI-powered content
                generation and customization
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#4a5568] hover:bg-[#374151] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
              >
                Build Your Resume Now
              </button>
            </div>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gray-50">
                <div className="w-16 h-16 bg-[#4a5568] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Customizable Themes
                </h3>
                <p className="text-gray-600">
                  Personalize your resume with custom color scheme
                </p>
              </div>
              <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gray-50">
                <div className="w-16 h-16 bg-[#4a5568] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  AI-Powered Content
                </h3>
                <p className="text-gray-600">
                  Generate professional job and experience summaries using AI
                </p>
              </div>
              <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gray-50">
                <div className="w-16 h-16 bg-[#4a5568] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Easy Sharing
                </h3>
                <p className="text-gray-600">
                  Download your resume as pdf or share directly via link
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Input Your Details",
                  desc: "Enter your professional information and experience",
                },
                {
                  step: "2",
                  title: "AI Enhancement",
                  desc: "Let AI generate your content and suggestions",
                },
                {
                  step: "3",
                  title: "Customize Design",
                  desc: "Choose your preferred color scheme",
                },
                {
                  step: "4",
                  title: "Download & Share",
                  desc: "Get your professional resume instantly",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#4a5568] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of job seekers who have created stunning resumes
              with our AI-powered platform
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#4a5568] hover:bg-[#374151] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
