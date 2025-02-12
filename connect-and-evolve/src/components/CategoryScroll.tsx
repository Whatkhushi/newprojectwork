import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Code, Palette, Brain, Megaphone, PenTool, BookOpen, LineChart, Briefcase, Camera, Music, Languages } from "lucide-react";
import { useRef } from "react";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
}

const categories: Category[] = [
  {
    id: "programming",
    name: "Programming",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Web, Mobile & Software Development",
    icon: <Code className="w-6 h-6" />,
    skills: ["React", "Node.js", "Python", "Java", "JavaScript", "TypeScript", "Mobile Development"]
  },
  {
    id: "design",
    name: "Design",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    description: "UI/UX, Graphic & Product Design",
    icon: <Palette className="w-6 h-6" />,
    skills: ["UI Design", "UX Research", "Graphic Design", "Product Design", "Branding"]
  },
  {
    id: "ai-ml",
    name: "AI/ML",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Artificial Intelligence & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Science"]
  },
  {
    id: "marketing",
    name: "Marketing",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "Digital Marketing & Social Media",
    icon: <Megaphone className="w-6 h-6" />,
    skills: ["Digital Marketing", "Social Media", "Content Marketing", "SEO", "Email Marketing"]
  },
  {
    id: "writing",
    name: "Writing",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    description: "Content Writing & Copywriting",
    icon: <PenTool className="w-6 h-6" />,
    skills: ["Content Writing", "Copywriting", "Technical Writing", "Creative Writing"]
  },
  {
    id: "business",
    name: "Business",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    description: "Business Strategy & Management",
    icon: <Briefcase className="w-6 h-6" />,
    skills: ["Business Strategy", "Project Management", "Leadership", "Entrepreneurship"]
  },
  {
    id: "finance",
    name: "Finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    description: "Financial Planning & Analysis",
    icon: <LineChart className="w-6 h-6" />,
    skills: ["Financial Analysis", "Investment", "Accounting", "Trading"]
  },
  {
    id: "languages",
    name: "Languages",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    description: "Language Learning & Translation",
    icon: <Languages className="w-6 h-6" />,
    skills: ["English", "Spanish", "Chinese", "Japanese", "French", "German"]
  }
];

interface CategoryScrollProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onSelectSkill?: (skill: string) => void;
}

export const CategoryScroll = ({ onSelectCategory, selectedCategory, onSelectSkill }: CategoryScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full mb-8 group">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-4"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "relative flex-shrink-0 w-72 h-48 category-card cursor-pointer group card-hover",
              selectedCategory === category.id.toLowerCase() && "ring-2 ring-purple-500"
            )}
            onClick={() => onSelectCategory(category.id.toLowerCase())}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-purple-500/20 backdrop-blur-sm">
                  {category.icon}
                </div>
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
              <p className="text-white/80 text-sm">{category.description}</p>
              
              {selectedCategory === category.id.toLowerCase() && (
                <div className="mt-2 flex flex-wrap gap-1 animate-fadeIn">
                  {category.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSkill?.(skill);
                      }}
                      className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-white hover:bg-purple-500/40 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 glass opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 glass opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
