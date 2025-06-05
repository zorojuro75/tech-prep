"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateQuestions } from "@/lib/gemini";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LevelSelector from "@/components/RoleSelector";

export default function CustomCategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<"fresher" | "junior" | "mid-level" | "senior">("junior");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (category.length > 50) {
      toast.error("Category name must be less than 50 characters");
      return;
    }

    try {
      setLoading(true);
      toast.info("Generating your custom test...", {
        description: "This may take a moment as we create tailored questions"
      });

      // Generate questions using Gemini API
      const questions = await generateQuestions(
        category,
        level,
        "mcq", // Default to MCQ for custom categories
        10 // Generate 40 questions
      );

      // Store in session storage
      sessionStorage.setItem("customTest", JSON.stringify({
        questions,
        category,
        level,
        testType: "custom"
      }));

      // Redirect to test page
      router.push(`/test?type=custom&level=${encodeURIComponent(level)}`);
      
    } catch (error) {
      console.error("Error generating test:", error);
      toast.error("Failed to create test", {
        description: "Please try again later or check your network connection"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card className="border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Rocket className="w-8 h-8 text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Custom Test
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">
                What topic do you want to test?
              </Label>
              <Input
                id="category"
                placeholder="Enter a technology, concept, or domain (e.g., Web Security, React Hooks, System Design)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
                className="h-12 text-base"
              />
              <p className="text-sm text-gray-500">
                Examples: "CSS Grid", "TypeScript Generics", "REST API Best Practices"
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Select difficulty level:
              </Label>
              <LevelSelector 
                value={level} 
                onChange={(value) => setLevel(value as "fresher" | "junior" | "mid-level" | "senior")}
                label=""
                className="w-full"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading || !category.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-12 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Test...
                  </>
                ) : (
                  "Create Custom Test"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-5 bg-blue-50">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">Popular Categories</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Web Security</li>
            <li>• React Performance</li>
            <li>• TypeScript Advanced</li>
            <li>• System Design</li>
            <li>• GraphQL Concepts</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-5 bg-green-50">
          <h3 className="font-semibold text-lg text-green-800 mb-2">How It Works</h3>
          <ol className="space-y-2 text-gray-700">
            <li>1. Enter any technical topic</li>
            <li>2. Select difficulty level</li>
            <li>3. AI generates 5 questions</li>
            <li>4. Take the test immediately</li>
          </ol>
        </div>
        
        <div className="border rounded-lg p-5 bg-amber-50">
          <h3 className="font-semibold text-lg text-amber-800 mb-2">Tips</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Be specific for better questions</li>
            <li>• Combine technologies (e.g., "React + TypeScript")</li>
            <li>• Use senior level for design/architecture topics</li>
            <li>• Junior level focuses on fundamentals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}