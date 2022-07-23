import React from "react";
import "../Styles/Select.scss";

const DropBox = ({ options, handleChange }) => {
  return (
    <select className="Select" onChange={handleChange}>
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          //이거 왜 갑자기 디폴트 안먹지, 일단 첫번째 항목으로 막아는 놓음
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default DropBox;
