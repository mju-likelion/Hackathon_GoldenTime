import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { infoData, coordinates } from "../Atoms/atoms";
import "../Styles/Info.scss";
import callImage from "../Datas/call.png";

const Info = ({ props, url }) => {
  const InfoValue = useRecoilState(infoData);
  const coordinatesData = useRecoilState(coordinates);
  const setInfoValue = useSetRecoilState(infoData);
  const { myposy, myposx } = coordinatesData[0]; // 사용자 위치 추적 좌표
  const { address, callNumber, title, y, x } = InfoValue[0]; //병원 객체
  const image = url ? url : InfoValue[0].image; //이미지는 따로 관리해줘야 리스트가 관리됨
  const { dutyAddr, dutyName, dutyTel3, wgs84Lat, wgs84Lon } = props; // 리스트 페이지를 위한 props형태 병원 객체

  const navigate = useNavigate();
  //렌더링이 너무 많이 되는데..
  const goDetail = () => {
    setInfoValue({
      address: dutyAddr || address,
      title: dutyName || title,
      callNumber: dutyTel3 || callNumber,
      myposx: myposx,
      myposy: myposy,
      y: wgs84Lat || y,
      x: wgs84Lon || x,
      image: url || image,
    }); //prosp여부에 따른 좌표 전역 상태값 핸들링
    navigate("/detail");
  };
  const phoneCall = () => {
    window.location.href = dutyTel3 ? "tel:" + dutyTel3 : "tel:" + callNumber;
    //전화번호로 로그인 되어야 디바이스 번호 연결
  };

  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">{dutyAddr || address}</p>
        <p className="InfoTextTitle">{dutyName || title}</p>
        <div className="buttonlist">
          <button className="InfoButtonCall" onClick={phoneCall}>
            <img alt="call" src={callImage} />
          </button>
          <p className="InfoButton" onClick={goDetail}>
            자세히 {"\u00A0"}
            {">"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Info);
