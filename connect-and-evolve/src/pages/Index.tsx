import { useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { SearchFilters } from "@/components/SearchFilters";
import { CategoryScroll } from "@/components/CategoryScroll";
import { User } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Award, Users, Trophy, Rocket, Brain } from "lucide-react";

const mockUsers: User[] = [
  // {
  //   id: "1",
  //   name: "Alex Chen",
  //   avatar: "https://i.pravatar.cc/150?u=alex",
  //   specialization: "Full Stack Developer",
  //   rating: 4.8,
  //   isVerified: true,
  //   bio: "Passionate about teaching and learning new technologies",
  //   skills: [
  //     { name: "React", level: "Advanced", category: "Programming" },
  //     { name: "Node.js", level: "Advanced", category: "Programming" },
  //     { name: "UI Design", level: "Intermediate", category: "Design" },
  //   ],
  //   learning: [
  //     { name: "Machine Learning", level: "Beginner", category: "Programming" },
  //     { name: "Digital Marketing", level: "Beginner", category: "Marketing" },
  //   ],
  //   availability: "Online",
  // },
  {
    id: "1",
    name: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    specialization: "UX Designer",
    rating: 4.5,
    isVerified: true,
    bio: "Creating beautiful and functional user experiences",
    skills: [
      { name: "UI/UX Design", level: "Advanced", category: "Design" },
      { name: "Figma", level: "Advanced", category: "Design" },
      { name: "User Research", level: "Beginner", category: "Design" },
    ],
    learning: [
      { name: "React", level: "Beginner", category: "Programming" },
      { name: "Python", level: "Beginner", category: "Programming" },
    ],
    availability: "Both",
  },
  {
    "id": "2",
    "name": "Ishita Mukund",
    "avatar": "https://i.pravatar.cc/150?u=michael",
    "specialization": "Data Scientist",
    "rating": 4.7,
    "isVerified": false,
    "bio": "Loves working with data and building intelligent systems",
    "skills": [
      { "name": "Python", "level": "Advanced", "category": "Programming" },
      { "name": "TensorFlow", "level": "Beginner", "category": "AI/ML" },
      { "name": "SQL", "level": "Advanced", "category": "Databases" }
    ],
    "learning": [
      { "name": "Cloud Computing", "level": "Beginner", "category": "DevOps" },
      { "name": "Cybersecurity", "level": "Beginner", "category": "Security" }
    ],
    "availability": "Offline"
  },
  {
    "id": "3",
    "name": "Ananya Kapoor",
    "avatar": "https://i.pravatar.cc/150?u=emily",
    "specialization": "Marketing Strategist",
    "rating": 3,
    "isVerified": true,
    "bio": "Helping brands grow with digital marketing strategies",
    "skills": [
      { "name": "SEO", "level": "Advanced", "category": "Marketing" },
      { "name": "Google Ads", "level": "Intermediate", "category": "Marketing" },
      { "name": "Content Writing", "level": "Advanced", "category": "Writing" }
    ],
    "learning": [
      { "name": "Graphic Design", "level": "Beginner", "category": "Design" },
      { "name": "Python", "level": "Beginner", "category": "Programming" }
    ],
    "availability": "Online"
  },
  {
    id: "4",
    name: "Mulaik Khan",
    avatar: "https://i.pravatar.cc/150?u=alex",
    specialization: "Digital Marketer",
    rating: 4.6,
    isVerified: false,
    bio: "Helping brands grow through data-driven marketing.",
    skills: [
      { name: "SEO", level: "Advanced", category: "Marketing" },
      { name: "Google Ads", level: "Advanced", category: "Marketing" },
      { name: "Social Media Strategy", level: "Intermediate", category: "Marketing" },
    ],
    learning: [
      { name: "Email Marketing", level: "Beginner", category: "Marketing" },
      { name: "AI in Marketing", level: "Beginner", category: "Technology" },
    ],
    availability: "Both",
  },
  {
    id: "6",
    name: "Meera Iyer",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    specialization: "Content Writer",
    rating: 4.7,
    isVerified: true,
    bio: "Writing compelling stories that engage and inspire.",
    skills: [
      { name: "Creative Writing", level: "Advanced", category: "Writing" },
      { name: "SEO Content", level: "Beginner", category: "Marketing" },
      { name: "Copywriting", level: "Intermediate", category: "Writing" },
    ],
    learning: [
      { name: "Technical Writing", level: "Beginner", category: "Writing" },
      { name: "UX Writing", level: "Beginner", category: "Design" },
    ],
    availability: "Online",
  },
];

const trendingSkills = [
  { name: "UI/UX Design", swaps: 100 },
  { name: "Python for Data Science", swaps: 85 },
  { name: "Public Speaking & Communication", swaps: 75 },
  { name: "React Development", swaps: 70 },
];

const dailyChallenges = [
  {
    icon: <Users className="w-5 h-5 text-purple-500" />,
    title: "Teach a Beginner",
    description: "Guide a new learner & earn bonus credits",
  },
  {
    icon: <Trophy className="w-5 h-5 text-purple-500" />,
    title: "Swap with 3 New Users",
    description: "Expand your network & gain experience",
  },
  {
    icon: <Rocket className="w-5 h-5 text-purple-500" />,
    title: "Master a Trending Skill",
    description: "Pick a hot skill & complete a mini-project",
  },
];

const Index = () => {
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();
    const filtered = mockUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.specialization.toLowerCase().includes(lowercaseQuery) ||
        user.skills.some((skill) =>
          skill.name.toLowerCase().includes(lowercaseQuery)
        )
      );
    });
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filter: string, value: string) => {
    let filtered = [...mockUsers];

    if (value !== "all categories" && filter === "category") {
      filtered = filtered.filter((user) =>
        user.skills.some((skill) => skill.category.toLowerCase() === value)
      );
    }

    if (value !== "all levels" && filter === "level") {
      filtered = filtered.filter((user) =>
        user.skills.some((skill) => skill.level.toLowerCase() === value)
      );
    }

    if (value !== "all" && filter === "availability") {
      filtered = filtered.filter(
        (user) => user.availability.toLowerCase() === value
      );
    }

    setFilteredUsers(filtered);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleFilterChange("category", category);
  };

  const handleSkillSelect = (skill: string) => {
    handleSearch(skill);
  };

  const handleRequestSwap = (userId: string) => {
    console.log("Swap requested with user:", userId);
  };

  const handleViewProfile = (userId: string) => {
    window.open(`/profile/${userId}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-6 h-6 animate-float" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            <span className="text-black">🤝</span> Swap Skills, Expand Your Horizons! <span className="text-black">🌍</span>
            </h1>
            <Sparkles className="w-6 h-6 animate-float" />
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect, share expertise, and supercharge your learning! 🚀
          </p>
          
        </div>
        <div className="flex justify-center items-center gap-6 text-lg font-semibold 
                text-purple-700 opacity-90 mt-4 animate-fade-in">
  <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r 
                   from-pink-200 to-purple-300 text-purple-900 shadow-sm 
                   hover:scale-105 transition-transform duration-300">
    🔄 Trade Skills
  </span>
  
  <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r 
                   from-purple-300 to-pink-200 text-purple-900 shadow-sm 
                   hover:scale-105 transition-transform duration-300">
    🎯  Smart Swaps
  </span>

  <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r 
                   from-pink-200 to-purple-300 text-purple-900 shadow-sm 
                   hover:scale-105 transition-transform duration-300">
    ⏳ Earn Time Credits
  </span>

  <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r 
                   from-purple-300 to-pink-200 text-purple-900 shadow-sm 
                   hover:scale-105 transition-transform duration-300">
    🌟 Level Up
  </span>
</div>

        
        

        <CategoryScroll
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
          onSelectSkill={handleSkillSelect}
        />

        <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {searchQuery && (
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 animate-fadeIn">
            Recommended Matches
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProfileCard
                user={user}
                onRequestSwap={handleRequestSwap}
                onViewProfile={handleViewProfile}
              />
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <p className="text-gray-500 dark:text-gray-400">
              No users found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
