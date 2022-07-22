import React from "react";
import "../Styles/Select.scss";
import "../Styles/DropBoxWrapper.scss";

const DropBox = ({ options, handleChange }) => {
  //일단 코드 지저분한건 나중에 (구조분해)

  return (
    <select className="Select" onChange={handleChange}>
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          //이거 왜 갑자기 디폴트 안먹지, 일단 첫번째 항목으로 막아는 놓음
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropBox;
