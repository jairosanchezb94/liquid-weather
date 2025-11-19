import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-white/5", className)} />
  );
};

export const BentoSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
      {/* Hero Skeleton */}
      <div className="md:col-span-2 lg:col-span-2 row-span-2 min-h-[340px] bg-[#0f0f11]/60 border border-white/5 rounded-[24px] p-5 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-3">
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      {/* Small Cards Skeletons */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-square bg-[#0f0f11]/60 border border-white/5 rounded-[24px] p-5 flex flex-col justify-between">
           <div className="flex items-center gap-2">
             <Skeleton className="h-3 w-3 rounded-full" />
             <Skeleton className="h-3 w-16" />
           </div>
           <div className="flex justify-center items-center flex-1">
             <Skeleton className="h-12 w-12 rounded-full" />
           </div>
        </div>
      ))}

      {/* Hourly Skeleton */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4 min-h-[160px] bg-[#0f0f11]/60 border border-white/5 rounded-[24px] p-5">
         <Skeleton className="h-4 w-32 mb-4" />
         <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-8" />
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
