import RoleCard from "@/components/RoleCard";
import { 
  LayoutTemplate, 
  Server, 
  TestTube2, 
  BarChart, 
  BrainCircuit,
  Code 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const roles = [
    {
      title: "Frontend Developer",
      description: "Master UI development concepts and modern framework patterns",
      icon: <LayoutTemplate className="w-5 h-5" />,
      href: "/test?role=frontend",
      technologies: ["React", "Angular", "Vue", "CSS"]
    },
    {
      title: "Backend Developer",
      description: "Test your knowledge of server-side technologies and APIs",
      icon: <Server className="w-5 h-5" />,
      href: "/test?role=backend",
      technologies: ["Node.js", "Express", "Django", "Spring Boot"]
    },
    {
      title: "QA Engineer",
      description: "Validate your testing methodologies and automation skills",
      icon: <TestTube2 className="w-5 h-5" />,
      href: "/test?role=qa",
      technologies: ["Selenium", "Jest", "Cypress", "JIRA"]
    },
    {
      title: "Data Analyst",
      description: "Demonstrate your data manipulation and visualization expertise",
      icon: <BarChart className="w-5 h-5" />,
      href: "/test?role=data-analyst",
      technologies: ["SQL", "Python", "Tableau", "Pandas"]
    },
    {
      title: "Machine Learning Engineer",
      description: "Prove your ML algorithm knowledge and model deployment skills",
      icon: <BrainCircuit className="w-5 h-5" />,
      href: "/test?role=ml-engineer",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"]
    },
    {
      title: "C++ Developer",
      description: "Test your low-level programming and system design knowledge",
      icon: <Code className="w-5 h-5" />,
      href: "/test?role=cpp-developer",
      technologies: ["C++17", "STL", "Multithreading", "Templates"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm">
              <span className="mr-2">🚀</span>
              <span>AI-Powered Technical Interview Prep</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Land Your Dream <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Tech Job</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Practice with AI-generated assessments tailored to your role and experience level. 
              Get instant feedback and personalized roadmaps.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/custom-category">
                <button className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Create Custom Test
                </button>
              </Link>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg text-lg transition-all">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Role-Based Assessments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your target role to start a personalized assessment. 
              Questions are dynamically generated based on current industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <RoleCard
                key={index}
                title={role.title}
                description={role.description}
                icon={role.icon}
                href={role.href}
                technologies={role.technologies}
              />
            ))}
          </div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-gray-200">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Trusted by Developers Worldwide
              </h3>
              <p className="text-gray-600">
                Join thousands of developers who landed jobs at top tech companies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Preparing with TechPrep helped me ace my React interview at Meta!",
                "The ML engineering tests were incredibly relevant to real-world scenarios.",
                "Got my backend developer role thanks to targeted practice on this platform."
              ].map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="text-amber-400 flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial}</p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Anonymous</p>
                      <p className="text-sm text-gray-500">Senior Developer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}