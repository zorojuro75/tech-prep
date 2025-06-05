import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Twitter,
  Mail
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold">TechPrep</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              AI-powered technical interview preparation platform for developers at all experience levels.
            </p>
          </div>
          
          {/* Links Section */}
          <div className="md:ml-auto">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/custom-category" className="text-gray-400 hover:text-white transition-colors">
                  Create Custom Category
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="https://github.com" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:support@techprep.dev" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-gray-400">
              Have questions? <br />
              <Link href="mailto:support@techprep.dev" className="text-indigo-400 hover:underline">
                support@techprep.dev
              </Link>
            </p>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>
            &copy; {currentYear} TechPrep. All rights reserved.
          </p>
          <p className="mt-1 text-sm">
            Designed and built with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;