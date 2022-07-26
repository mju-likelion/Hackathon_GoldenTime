import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";

const Info = () => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate("/detail");
  };

  const phoneCall = (phoneNumber) => {
    window.location.href = "tel:" + "01057803574";
    //이거 나중에 props로 데이터 받으면 전화 번호 여기다가 넣어야됨
    //그냥 a 태그로 하는게 속도는 더 빠름
  };

  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">경기도 용인시 처인구 남동</p>
        <p className="InfoText">xxx응급실</p>
        <div className="buttonlist">
          <button className="InfoButton" onClick={goDetail}>
            자세히
          </button>
          <button className="InfoButton" onClick={phoneCall}>
            전화연결
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
