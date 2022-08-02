import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { infoData } from "../Atoms/atoms";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";

const Info = () => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate("/detail");
  };
  const InfoValue = useRecoilState(infoData);
  const { address, callNumber, title } = InfoValue[0];
  const phoneCall = () => {
    window.location.href = "tel:" + callNumber;
    //그냥 a 태그로 하는게 속도는 더 빠름 ++ 크롬 로그인 양쪽에서,,, 전화번호로 로그인 해야되네
  };

  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">{address}</p>
        <p className="InfoText">{title}</p>
        <div className="buttonlist">
          <button className="InfoButton" onClick={goDetail}>
            자세히
          </button>
          <button className="InfoButton" onClick={phoneCall}>
            전화 걸기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
