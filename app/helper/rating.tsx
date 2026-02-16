import { IconStar, IconStarFilled } from '@tabler/icons-react';

interface RatingStars {
  rateNum: number;
  className?: string;
}

export default function Rating({ rateNum, className = "" }: RatingStars) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rateNum - index, 0), 1) * 100;

        return (
          <div key={index} className="relative w-6 h-6">
            {/* Outline Star */}
            <IconStar className={`${className} text-cyan-500`}/>

            {/* Filled Star */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
                <IconStarFilled className={`${className} text-cyan-500`} />

            </div>
          </div>
        );
      })}
    </div>
  );
}
