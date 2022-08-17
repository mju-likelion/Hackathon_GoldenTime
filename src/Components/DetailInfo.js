import React from "react";
import { useRecoilValue } from "recoil";
import "../Styles/Info.scss";
import { details, infoData } from "../Atoms/atoms";
import callImage from "../Datas/call.png";

const DetailInfo = () => {
  const detailsValue = useRecoilValue(details);
  const infoValue = useRecoilValue(infoData);
  const { distance, time } = detailsValue;
  const { address, title, callNumber, image } = infoValue;
  const km = parseInt(distance / 1000);
  const m = distance % 1000;
  const minute = parseInt(time / 60);
  const second = time % 60;
  const phoneCall = () => {
    window.location.href = "tel:" + callNumber;
  };

  return (
    <div className="DetailInfo">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
      <p className="InfoText">{address}</p>
        <p className="InfoTextTitle">{title}</p>
        <div className="buttonlist">
          <button className="InfoButtonCall" onClick={phoneCall}>
            <img alt="call" src={callImage} />
          </button>
        </div>
        <p className="DetailInfoText">
          최단 거리는 {km}.{m} km입니다. <br />
          예상 소요시간은 {minute}분 {second}초 입니다.
        </p>
      </div>
    </div>
  );
};

export default DetailInfo;
