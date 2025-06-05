import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  technologies?: string[];
}

const RoleCard = ({
  title,
  description,
  icon,
  href,
  technologies = []
}: RoleCardProps) => {
  return (
    <Link href={href} className="block h-full transition-transform hover:scale-[1.02]">
      <Card className="h-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              {icon}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {technologies.map(tech => (
                <Badge 
                  key={tech}
                  variant="outline"
                  className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RoleCard;