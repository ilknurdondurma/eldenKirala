import classNames from "classnames";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";

function Input({
  variant,
  size,
  children,
  className,
  name,
  placeholder,
  label,
  readOnly,
  type,
  ...props
}) {
  const inputClasses = classNames(
    "w-full flex inline-block m-2 bg-my_input_bg text-black",
    {
      "w-full h-10 border border-my_border_color rounded-lg  focus:outline-1 focus:outline-primary/50 px-3 ":variant === "primary",
      "w-full h-12 border border-my_border_color rounded-2xl  focus:outline-1 focus:outline-primary/50 px-3 ":variant === "secondary",

      "px-5  h-10 text-lg": size === "normal",
      "px-6  h-12 text-lg": size === "large",
    },
    className
  );

  return (
    <div>
      {label && (
        <div className="mb-2.5 ps-3 text-lg text-text_primary/80">{label} :</div>
      )}
      <Field
        name={name}
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        className={inputClasses}
        {...props}
      />
      <ErrorMessage
        component="small"
        name={name}
        className="text-xs text-red-500 dark:text-red-400 mt-1 block"
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(["primary" ,"secondary"]),
  size: PropTypes.oneOf(["normal", "large"]),
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  placeholder:PropTypes.string,
};

Input.defaultProps = {
  variant: "primary",
  size: "normal",
  readOnly: false,
  type: "text",
  placeholder:" "
};

export default Input;