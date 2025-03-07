import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center text-3xl border-solid border-2 border-black mx-auto my-auto">
      {children}
    </div>
  );
};

export default FormContainer;
