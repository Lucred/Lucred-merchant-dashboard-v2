import React from "react";

interface CustomRangeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trackColor?: string;
  thumbColor?: string;
}

const CustomRangeInput: React.FC<CustomRangeInputProps> = ({
  trackColor = "bg-red-500",
  thumbColor = "bg-blue-700",
  className = "",
  ...props
}) => {
  return (
    <input
      type='range'
      className={`
        w-full h-2 appearance-none cursor-pointer
        ${trackColor} rounded-full
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:${thumbColor}
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:border-0
        [&::-moz-range-thumb]:${thumbColor}
        ${className}
      `}
      {...props}
    />
  );
};

export default CustomRangeInput;
