import React from 'react';
import { Edit3, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserProfileCardProps {
  className?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ className }) => {
  const userInfo = {
    name: "Jordan Smith",
    email: "jordan.smith@email.com",
    level: 3,
    role: "Rising Charmer",
    avatar: "JS"
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleShareProfile = () => {
    console.log('Share profile clicked');
  };

  return (
    <div className={cn("card-primary relative overflow-hidden group", className)}>
      {/* Soft glow outline */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/5 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header with avatar and share */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-primary/20 ring-offset-2 ring-offset-card">
                <AvatarFallback className="text-lg font-bold bg-gradient-primary text-primary-foreground">
                  {userInfo.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-0.5 bg-gradient-primary rounded-full opacity-20 blur-sm" />
            </div>
            
            {/* User info */}
            <div>
              <h2 className="heading-card text-2xl mb-1">{userInfo.name}</h2>
              <p className="text-caption mb-2">{userInfo.email}</p>
              <div className="flex items-center gap-3">
                <div className="level-badge">
                  Level {userInfo.level}
                </div>
                <span className="text-subtitle text-sm">{userInfo.role}</span>
              </div>
            </div>
          </div>
          
          {/* Share button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShareProfile}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Edit Profile Button */}
        <Button 
          onClick={handleEditProfile}
          className="w-full btn-tier-1"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-50" />
    </div>
  );
};

export default UserProfileCard;