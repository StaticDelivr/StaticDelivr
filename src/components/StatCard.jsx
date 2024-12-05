import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import CountUp from 'react-countup'; // Import CountUp

const StatCard = ({ title, value, change, icon: Icon, unit }) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          <CountUp 
            start={0} // Start counting from 0
            end={value} // Dynamic value passed as a prop
            duration={2} // Duration of the animation
            separator="," // Optional: Adds commas to large numbers
          />
          {unit && <span className="text-gray-900">{unit}</span>}
        </span>
        {change !== undefined && (
          <div className={`flex items-center ${trendColor} text-sm`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
