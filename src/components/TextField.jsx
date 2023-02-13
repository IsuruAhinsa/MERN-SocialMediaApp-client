import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TextField = ({
  type = "text",
  error,
  onBlur,
  onChange,
  label,
  value,
  name,
  errorText,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames(
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
            "block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
          )}
          placeholder={placeholder}
          value={value}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default TextField;
