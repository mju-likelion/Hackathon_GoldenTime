import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { aidInfos } from "../Atoms/atoms";
import "../Styles/Info.scss";

const AidInfo = () => {
  const recoilValue = useRecoilValue(aidInfos);

  const { firstAid, firstImage } = recoilValue;

  const firstaidcommma = firstAid.split(".");
  const firstAidNew = firstaidcommma.map((firstaidcommmas, index) => (
    <li key={index}>{firstaidcommmas}</li>
  )); // 점 찍힌 곳마다 줄 바꿈

  return (
    <div className="aidInfo">
      <img className="hospitalImage" alt="AidInfoImage" src={firstImage}></img>
      <div className="InfoList">
        <p className="InfoText">{firstAidNew}</p>
      </div>
    </div>
  );
};

export default AidInfo;
