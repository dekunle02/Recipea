import React, { ForwardedRef } from "react";

// Documentation for react hook forms => https://react-hook-form.com/get-started#Handleerrors

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isRequired?: boolean;
  showError?: boolean;
  label?: string;
  errorMessage?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props: FormInputProps, ref) => {
    const {
      id,
      label,
      type,
      showError,
      errorMessage,
      isRequired,
      ...otherProps
    } = props;

    return (
      <div className="relative flex-grow flex flex-col">
        <label
          className={`mb-1 ml-1 font-semibold ${
            isRequired ? "after:content-['*'] after:text-colorRed" : ""
          }`}
          htmlFor={id}
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            id={id}
            className={`${
              showError ? "ring-2 ring-rose-800/10 border border-rose-800" : ""
            } w-full rounded-lg p-2 bg-colorGray focus:border-teal-600 focus:ring-teal-600/10 focus:ring-4 drop-shadow-sm`}
            {...otherProps}
          />
        ) : (
          <input
            ref={ref}
            className={`${
              showError ? "ring-2 ring-rose-800/10 border border-rose-800" : ""
            } w-full rounded-lg p-2 bg-colorGray focus:border-teal-600 focus:ring-teal-600/10 focus:ring-4 drop-shadow-sm`}
            id={id}
            type={type}
            {...otherProps}
          />
        )}
        {showError && errorMessage && (
          <p className="text-rose-800 text-end text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
