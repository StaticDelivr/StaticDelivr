import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import CountUp from 'react-countup'; // Import CountUp

const StatCard = ({ title, value, change, icon: Icon, unit }) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';

  // Check if the value is a whole number
  const hasDecimal = value % 1 !== 0;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-gray-600 dark:text-zinc-400 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
          <CountUp 
            start={0} // Start counting from 0
            end={value} // Dynamic value passed as a prop
            duration={2} // Duration of the animation
            separator="," // Optional: Adds commas to large numbers
            decimals={hasDecimal ? 2 : 0} // Conditionally render decimals based on value
            decimal="." // Make sure the decimal point is shown correctly if needed
          />
          {unit && <span className="text-gray-900 dark:text-zinc-100">{unit}</span>}
        </span>
        {change !== undefined && (
          <div className={`flex items-center ${trendColor} dark:${trendColor.replace('600', '400')} text-sm`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <CountUp
              start={0} // Start counting from 0
              end={Math.abs(change)} // Use absolute value for percentage change
              duration={2} // Same duration for consistency
              separator=","
              decimals={2} // You can adjust decimals as needed
              decimal="."
            />
            %
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
