"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarUrl, getInitials } from "@/utils/avatar-utils";
import { cn } from "@/components/ui/utils";

interface UserAvatarProps {
  avatarUrl?: string | null;
  name?: string | null;
  email?: string | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-28 h-28",
};

export function UserAvatar({
  avatarUrl,
  name,
  email,
  className,
  imageClassName,
  fallbackClassName,
  size = "md",
}: UserAvatarProps) {
  const resolvedUrl = getAvatarUrl(avatarUrl);
  const initials = getInitials(name, email);

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {resolvedUrl && (
        <AvatarImage 
          src={resolvedUrl} 
          alt={name || "User avatar"} 
          className={cn("object-cover", imageClassName)} 
        />
      )}
      <AvatarFallback 
        className={cn(
          "bg-gradient-to-br from-purple-400 to-cyan-400 text-white font-bold uppercase",
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
