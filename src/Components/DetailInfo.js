import React from "react";
import { useRecoilValue } from "recoil";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";
import { details } from "../Atoms/atoms";

const DetailInfo = () => {
  const detailsValue = useRecoilValue(details);
  const { distance, time } = detailsValue;
  const minute = parseInt(time / 60);
  const second = time % 60;

  console.log(detailsValue);
  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">xxx응급실</p>
        <p className="InfoText">증상 진료 여부 확인 : y</p>
        <p className="InfoText">입원 가능 여부 : y</p>
        <p className="InfoText">상세 위치 : 경기도 용인시 처인구 남동 ~~~~</p>
        <p className="InfoText">Tel : 010 -xxxx -xxxx </p>
        <p className="DetailInfoText">
          최단 거리는 {distance} m이며, 예상 소요시간은 {minute}분 {second}초
          입니다.
        </p>
      </div>
    </div>
  );
};

export default DetailInfo;
