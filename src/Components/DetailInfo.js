import React from "react";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";

const DetailInfo = () => {
  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">경기도 용인시 처인구 남동</p>
        <p className="InfoText">xxx응급실</p>
        <p className="InfoText">증상 진료 여부 확인 : y</p>
        <p className="InfoText">입원 가능 여부 : y</p>
        <p className="InfoText">상세 위치 : 경기도 용인시 처인구 남동 ~~~~</p>
        <p className="InfoText">Tel : 010 -xxxx -xxxx </p>
        <div className="buttonlist"></div>
      </div>
    </div>
  );
};

export default DetailInfo;
