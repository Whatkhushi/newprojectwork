
import { User } from "@/utils/types";
import { RatingStars } from "./RatingStars";
import { SkillBadge } from "./SkillBadge";
import { BadgeCheck, ExternalLink, Upload, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProfileCardProps {
  user: User;
  onRequestSwap: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}

export const ProfileCard = ({ user, onRequestSwap, onViewProfile }: ProfileCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRequestSwap = () => {
    setIsDialogOpen(true);
  };

  const confirmSwapRequest = () => {
    onRequestSwap(user.id);
    setIsDialogOpen(false);
    toast({
      title: "Swap Request Sent!",
      description: "We'll notify you when they respond.",
      duration: 3000,
    });
  };

  const handleVerifyProfile = () => {
    setIsVerifyDialogOpen(true);
  };

  const handleVerificationSubmit = () => {
    setIsVerifyDialogOpen(false);
    toast({
      title: "Verification Started!",
      description: "Complete the quiz or upload your credentials to get verified.",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 card-hover border border-purple-100 dark:border-purple-900">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {!user.isVerified && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleVerifyProfile}
              className="text-xs bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/50 dark:hover:bg-purple-900"
            >
              Verify Profile
            </Button>
          )}
          {user.isVerified && (
            <div className="tooltip" data-tip="Verified Skills">
              <BadgeCheck className="w-5 h-5 text-purple-500" />
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {user.specialization}
            </p>
            <RatingStars rating={user.rating} className="mb-3" />
            
            <div className="flex flex-wrap gap-2 mb-4">
              {user.skills.slice(0, 3).map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
              {user.skills.length > 3 && (
                <span className="text-sm text-purple-500 dark:text-purple-400">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(user.id)}
                className="gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/50"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleRequestSwap}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Request Swap
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Skill Swap</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to request a skill swap with {user.name}? They will be notified of your request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSwapRequest}>
              Confirm Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Your Skills</AlertDialogTitle>
            <AlertDialogDescription>
            Show What You Know – Take a Quiz to Get Verified!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleVerificationSubmit}
            >
              <BrainCircuit className="w-4 h-4" />
              Skill Assessment Quiz
            </Button>
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleVerificationSubmit}
            >
              <Upload className="w-4 h-4" />
              Upload Certificates or Project Proof
            </Button> */}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
