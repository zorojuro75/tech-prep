import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, BrainCircuit, Code2, BookOpen, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <Rocket className="h-4 w-4 mr-2" />
          <span>Revolutionizing Technical Interview Prep</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TechPrep</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          TechPrep is an AI-powered platform designed to help developers prepare for technical interviews through personalized assessments and actionable feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Mission Card */}
        <Card className="border border-indigo-100">
          <CardHeader>
            <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              To democratize technical interview preparation by providing accessible, personalized practice for developers at all experience levels.
            </p>
            <p className="text-gray-700">
              We believe everyone deserves quality preparation resources regardless of background or financial means.
            </p>
          </CardContent>
        </Card>

        {/* AI Technology Card */}
        <Card className="border border-purple-100">
          <CardHeader>
            <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <BrainCircuit className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold">AI-Powered Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              TechPrep uses Google's Gemini AI to generate relevant, up-to-date questions tailored to your specific role and experience level.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Dynamic question generation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Personalized feedback reports</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Customized learning roadmaps</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Technology Stack Card */}
        <Card className="border border-blue-100">
          <CardHeader>
            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Code2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Built with modern web technologies for a seamless experience:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Next.js", desc: "App Router & Server Components" },
                { name: "TypeScript", desc: "Type-safe development" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "Shadcn UI", desc: "Beautiful components" },
                { name: "Gemini API", desc: "AI question generation" },
                { name: "Vercel", desc: "Serverless deployment" },
              ].map((tech, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Helps Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How TechPrep Prepares You for Real-World Jobs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Role-Specific Assessments",
                desc: "Practice tests tailored to your target role (Frontend, Backend, ML, etc.) with questions matching real interview formats.",
                icon: <BookOpen className="h-5 w-5 text-indigo-600" />
              },
              {
                title: "Experience-Level Customization",
                desc: "Tests adapt to your level - from fresher fundamentals to senior system design questions.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              },
              {
                title: "Real Coding Challenges",
                desc: "Solve actual coding problems with syntax-highlighted editors, just like technical screens.",
                icon: <Code2 className="h-5 w-5 text-indigo-600" />
              },
              {
                title: "Personalized Feedback",
                desc: "Get actionable insights on strengths, weaknesses, and specific areas for improvement.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
            ].map((benefit, idx) => (
              <div key={idx} className="flex">
                <div className="bg-white p-2.5 rounded-lg shadow-sm mr-4 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-xl border border-indigo-200">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">From Learning to Earning</h3>
                <p className="text-gray-700">
                  Our users report 3x more interview callbacks after completing just 5 assessments
                </p>
              </div>
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Link href="/">
                  Start Preparing Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-indigo-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions, suggestions, or partnership inquiries? We'd love to hear from you!
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-xl border border-gray-300 mb-8">
              <p className="text-lg font-medium text-gray-900 mb-1">Email Us</p>
              <p className="text-indigo-600 font-semibold">contact@techprep.dev</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Link href="https://github.com" className="bg-gray-800 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com" className="bg-gray-800 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" className="bg-gray-800 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}