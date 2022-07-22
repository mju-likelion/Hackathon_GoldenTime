import React from "react";
import styled from "styled-components";

const SelectBoxWrapper = styled.div`
  display: flex;
  width: 25%;
`;

export const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: flex;
  width: 100%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: red;
  }
`;

const DropBox = (props) => {
  const handleChange = (e) => {
    // event handler
    //console.log(e.target.value); // 이걸로 나중에 useState 관리해서 서버랑 통신
    const temp = e.target.value;
  };
  //일단 코드 지저분한건 나중에 (구조분해)
  return (
    <SelectBoxWrapper>
      <Select onChange={handleChange}>
        {props.options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={props.defaultValue === option.value} //이거 왜 갑자기 디폴트 안먹지
          >
            {option.name}
          </option>
        ))}
      </Select>
    </SelectBoxWrapper>
  );
};

export default DropBox;
