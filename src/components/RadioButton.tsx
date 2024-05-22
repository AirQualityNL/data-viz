import React, { useState } from "react";

interface RadioButtonProps {
  id: string;
  display_name: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  display_name,
  value,
  selectedValue,
  onChange,
}: RadioButtonProps) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className="flex align-middle items-center">
      <input
        type="radio"
        id={id}
        name={display_name}
        value={value}
        checked={value === selectedValue}
        onChange={handleChange}
        className="form-radio h-5 w-5 text-blue-600"
      />
      <label htmlFor={id} className="ml-2">
        {display_name}
      </label>
    </div>
  );
};
