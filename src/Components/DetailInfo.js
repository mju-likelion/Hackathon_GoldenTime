import React from "react";
import { useRecoilValue } from "recoil";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";
import { details, infoData } from "../Atoms/atoms";

const DetailInfo = () => {
  const detailsValue = useRecoilValue(details);
  const infoValue = useRecoilValue(infoData);
  const { distance, time } = detailsValue;
  const { address, title, callNumber } = infoValue;
  const km = parseInt(distance / 1000);
  const m = distance % 1000;
  const minute = parseInt(time / 60);
  const second = time % 60;
  const phoneCall = () => {
    window.location.href = "tel:" + callNumber;
  };

  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">{address}</p>
        <p className="InfoText">{title}</p>
        <p className="InfoText" onClick={phoneCall}>
          Tel : {callNumber}
        </p>
        <p className="DetailInfoText">
          최단 거리는 {km}.{m} km이며, 예상 소요시간은 {minute}분 {second}초
          입니다.
        </p>
      </div>
    </div>
  );
};

export default DetailInfo;
