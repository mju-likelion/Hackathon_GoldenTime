import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Title from "../Components/Title";
import DetailInfo from "../Components/DetailInfo";
import LoadRoute from "../Components/LoadRoute";
import Select from "../Components/Select";
import { coordinates, selectData } from "../Atoms/atoms";
import "../Styles/Info.scss";

const DetailPage = () => {
  const navigate = useNavigate();
  const goFirstAid = () => {
    navigate("/aid");
  };
  const { address, symptom } = useRecoilValue(selectData);

  return (
    <div>
      <Title name="응급실 찾기" />
      <p className="chocieText">검색 결과</p>
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      <DetailInfo />
      <p className="chocieText">추천 최단 경로</p>
      <LoadRoute />
      <button className="LastButton" onClick={goFirstAid}>
        응급 조치 정보
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;
