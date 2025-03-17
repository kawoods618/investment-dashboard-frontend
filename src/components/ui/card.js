import React from "react";

export const Card = ({ children, className }) => {
    return <div className={`bg-white p-4 rounded-lg shadow ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
    return <div className="border-b pb-2 mb-2">{children}</div>;
};

export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const CardContent = ({ children }) => {
    return <div>{children}</div>;
};
