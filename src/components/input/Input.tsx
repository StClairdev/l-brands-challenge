import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React, { ChangeEventHandler } from "react";
import "./input.css";

interface InputProps {
  className?: string | boolean;
  error?: string;
  handleValidation: ChangeEventHandler<HTMLInputElement>;
  label: string;
  name: string;
  placeholder: string;
  value?: string;
}

const Input = ({
  className,
  error,
  handleValidation,
  label,
  placeholder,
  name,
  value,
}: InputProps) => {
  const hasError = Boolean(error);
  const inputErrorClass = hasError ? " errorInputBorder" : "";
  const inputClasses = `input ${inputErrorClass}`;
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}:
      </label>
      <input
        className={inputClasses}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleValidation}
        onBlur={handleValidation}
      />
      {hasError && (
        <div className="form-errors" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
