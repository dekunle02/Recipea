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
          className={`label ${
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
            className="w-full rounded p-2 border border-colorWhite/50 bg-colorGray focus:ring focus:ring-colorPrimary/20  focus:border-colorPrimary"
            {...otherProps}
          />
        ) : (
          <input
            ref={ref}
            className="w-full rounded p-2 border border-colorWhite/50 bg-colorGray focus:ring focus:ring-colorPrimary/20  focus:border-colorPrimary"
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
