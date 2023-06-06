import React, { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, placeholder, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
        rows={4}
        placeholder={placeholder}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
