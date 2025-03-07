import React from "react";

const FormTitle = ({ title, subTitle }) => {
  return (
    <div className=" mb-4">
      <div>
        <h3 className=" text-dark-blue font-bold text-2xl pb-1 font-default">
          {title}{" "}
          {subTitle && (
            <span className=" text-light-gray text-lg font-medium">
              - {subTitle}
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};

export default FormTitle;
