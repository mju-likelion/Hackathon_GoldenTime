import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Title from "../Components/Title";
import Info from "../Components/Info";
import LoadRoute from "../Components/LoadRoute";
import { test } from "../Atoms/test";
import "../Styles/Info.scss";

const DetailPage = () => {
  const navigate = useNavigate();
  const goFirstAid = () => {
    navigate("/aid");
  };
  const recoilValue = useRecoilValue(test); // 해당 atom의 값
  console.log(recoilValue);

  return (
    <div>
      <Title name="응급실 찾기" />
      <p className="chocieText">검색 결과</p>
      <Info />
      <p className="chocieText">추천 최단 경로</p>
      <LoadRoute />
      <button className="LastButton" onClick={goFirstAid}>
        다른 곳 더보기
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;
