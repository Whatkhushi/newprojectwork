
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string, value: string) => void;
}

const categories = [
  "All Categories",
  "Programming",
  "Design",
  "Marketing",
  "Music",
  "Languages",
  "Writing",
  "Finance",
  "Engineering",
  "Health & Wellness",
  "Photography",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const availability = ["All", "Online", "Offline"];

export const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, skill, or specialization..."
            className="pl-10 border-purple-200 dark:border-purple-800 focus:ring-purple-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select onValueChange={(value) => onFilterChange("category", value)}>
            <SelectTrigger className="w-[180px] border-purple-200 dark:border-purple-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange("level", value)}>
            <SelectTrigger className="w-[180px] border-purple-200 dark:border-purple-800">
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level.toLowerCase()}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange("availability", value)}>
            <SelectTrigger className="w-[180px] border-purple-200 dark:border-purple-800">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {availability.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
