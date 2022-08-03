import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AidInfo from "../Components/AidInfo";
import Title from "../Components/Title";
import Select from "../Components/Select";
import { selectData } from "../Atoms/atoms";
import "../Styles/Info.scss";

const FirstAidPage = () => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/");
  };
  const { address, symptom } = useRecoilValue(selectData);
  return (
    <div>
      <Title name="응급 조치 정보" />
      <p className="chocieText">검색 결과</p>
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      <p className="chocieText">응급 조치</p>
      <AidInfo />
      <p className="chocieText">유의 사항</p>
      <AidInfo />

      <button className="LastButton" onClick={goMain}>
        응급실 검색 페이지로 돌아가기
      </button>
    </div>
  );
};

export default FirstAidPage;
