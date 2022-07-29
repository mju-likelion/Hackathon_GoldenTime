import React from "react";
import { RecoilLoadable, useRecoilValue } from "recoil";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";
import { test2 } from "../Atoms/test";

const DetailInfo = () => {
  const recoilValue2 = useRecoilValue(test2);// 해당 atom의 값 테스트 했으니까, 나중에 연동할 때 변수명 똑바로 하기

  console.log(recoilValue2)
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
        <p className="InfoText">거리 :  {recoilValue2.distance} m</p>
        <p className="InfoText">예상 소요 시간 : {recoilValue2.time}초</p>
        <div className="buttonlist"></div>
      </div>
    </div>
  );
};

export default DetailInfo;
