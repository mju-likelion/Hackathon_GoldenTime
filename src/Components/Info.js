import React from "react";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";

const Info = () => {
  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">경기도 용인시 처인구 남동</p>
        <p className="InfoText">xxx응급실</p>
        <button className="InfoButton">ㅎㅇ</button>
        <button className="InfoButton">ㅎㅇ</button>
      </div>
    </div>
  );
};

export default Info;
