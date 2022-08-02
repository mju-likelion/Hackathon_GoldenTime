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
  console.log(InfoValue);
  const phoneCall = (phoneNumber) => {
    window.location.href = "tel:" + "01057803574";
    //이거 나중에 props로 데이터 받으면 전화 번호 여기다가 넣어야됨
    //그냥 a 태그로 하는게 속도는 더 빠름
  };

  const { address, callNumber, title, x, y } = InfoValue[0];
  console.log(address);
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
            {callNumber}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
