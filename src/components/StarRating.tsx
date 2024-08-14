import React from 'react';

interface StarRatingProps {
  rating: number; // rating from 1 to 5, including decimals
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        const gradientId = `starGradient-${index}-${Math.random()}`;
        return (
          <svg
            key={index}
            className="h-5 w-5"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={gradientId}>
                <stop offset={`${fillPercentage}%`} stopColor="gold" />
                <stop offset={`${fillPercentage}%`} stopColor="gray" />
              </linearGradient>
            </defs>
            <path
              d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
              fill={`url(#${gradientId})`}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
