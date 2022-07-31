import React from "react";
import { useNavigate } from "react-router-dom";
import AidInfo from "../Components/AidInfo";
import Title from "../Components/Title";
import "../Styles/Info.scss";


const FirstAidPage = () => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/");
  };
  return <div>
    <Title name="응급 조치 정보" />
      <p className="chocieText">검색 결과</p>
      <p className="chocieText">응급 조치</p>
      <AidInfo/>
      <p className="chocieText">유의 사항</p>
      <AidInfo/>
      
          <button className="LastButton" onClick={goMain}>
          응급실 검색 페이지로 돌아가기
          </button>
       
            
  </div>;
};

export default FirstAidPage;
