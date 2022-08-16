import React from "react";
import { useRecoilValue } from "recoil";
import { aidInfos } from "../Atoms/atoms";
import "../Styles/Info.scss";

const Notice = () => {
  const recoilValue = useRecoilValue(aidInfos);
  const { notice, noticeImage } = recoilValue;

  const noticecommma = notice.split(".");
  const noticeNew = noticecommma.map((noticecommmas, index) => (
    <li key={index}>{noticecommmas}</li>
  )); // 점 찍힌 곳마다 줄 바꿈

  return (
    <div className="aidInfo">
      <img className="hospitalImage" alt="AidInfoImage" src={noticeImage} />
      <div className="InfoList">
        <p className="InfoText">{noticeNew}</p>
      </div>
    </div>
  );
};

export default Notice;
