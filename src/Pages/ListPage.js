import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Info from "../Components/Info";
import Title from "../Components/Title";
import Select from "../Components/Select";
import { selectData } from "../Atoms/atoms";
import "../Styles/Info.scss";

const ListPage = () => {
  const data = useLocation();
  const dataList = data.state;
  const { address, symptom } = useRecoilValue(selectData);
  console.log(dataList); //  테스트용

  return (
    <div>
      <Title name="응급실 리스트" />
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      {dataList?.map((data) => (
        <Info key={data.dutyAddr} props={data} />
      ))}
    </div>
  );
};

export default ListPage;
