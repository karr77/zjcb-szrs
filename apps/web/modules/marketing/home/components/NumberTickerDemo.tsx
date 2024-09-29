'use client'
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@ui/lib";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  decimalPlaces?: number;
  isHighlighted?: boolean;
}

const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  isHighlighted = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1500);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces],
  );

  return (
    <span
      className={cn(
        "inline-block tabular-nums tracking-wider",
        isHighlighted ? "text-white dark:text-gray-800" : "text-black dark:text-white",
        className,
      )}
      ref={ref}
    />
  );
}

interface StatCardProps {
  value: number;
  unit: string;
  description: string;
  isHighlighted?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, unit, description, isHighlighted = false }) => (
  <div className={`flex flex-col items-center justify-center px-16 py-8 rounded-lg ${
    isHighlighted 
      ? "bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-80 backdrop-blur-lg text-white dark:bg-gradient-to-r dark:from-blue-100 dark:to-white dark:text-gray-800" 
      : "bg-white bg-opacity-20 backdrop-blur-lg text-gray-800 dark:bg-gray-800 dark:bg-opacity-20 dark:text-gray-200"
  }`}>
    <div className="flex items-baseline">
      <span className={`text-8xl font-bold ${
        isHighlighted
          ? "text-white dark:text-gray-800"
          : "text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)] dark:from-gray-300 dark:to-gray-100 dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
      }`}>
        <NumberTicker value={value} isHighlighted={isHighlighted} />
      </span>
      <span className="text-xl ml-1">{unit}</span>
    </div>
    <p className={`mt-2 text-sm text-center ${isHighlighted ? "text-white dark:text-gray-800" : "text-gray-600 dark:text-gray-400"}`}>{description}</p>
  </div>
);

const Dashboard = () => (
  <div className="flex justify-center items-center mt-20 mb-20">
    <div className="flex justify-between items-center w-full max-w-7xl">
      <StatCard value={3} unit="小时" description="为每个潜在客户节省 3 小时的研究时间" />
      <StatCard value={40} unit="%" description="提高 40% 成交率" isHighlighted={true} />
      <StatCard value={1000} unit="" description="每个帐户收集超过 1000 个数据点" />
    </div>
  </div>
);

export default Dashboard;