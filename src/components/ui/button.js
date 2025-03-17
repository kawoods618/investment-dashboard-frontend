import React from "react";

export const Button = ({ children, ...props }) => {
  return <button className="bg-blue-500 text-white p-2 rounded-md" {...props}>{children}</button>;
};
