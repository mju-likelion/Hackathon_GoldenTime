import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { infoData, coordinates } from "../Atoms/atoms";
import "../Styles/Info.scss";
import image from "../Datas/image.jpg";

const Info = ({ props }) => {
  console.log(props);
  const InfoValue = useRecoilState(infoData);
  const coordinatesData = useRecoilState(coordinates);
  const setInfoValue = useSetRecoilState(infoData);
  const { myposy, myposx } = coordinatesData;
  const { address, callNumber, title, y, x } = InfoValue[0];
  const { dutyAddr, dutyName, dutyTel3, wgs84Lat, wgs84Lon } = props;
  const navigate = useNavigate();
  const goDetail = () => {
    // setInfoValue({
    //   address: dutyAddr || address,
    //   title: dutyName || title,
    //   callNumber: dutyTel3 || callNumber,
    //   myposx: myposx,
    //   myposy: myposy,
    //   y: wgs84Lat || y,
    //   x: wgs84Lon || x,
    // });
    navigate("/detail");
  };
  const phoneCall = () => {
    window.location.href = dutyTel3 ? "tel:" + dutyTel3 : "tel:" + callNumber;
    //그냥 a 태그로 하는게 속도는 더 빠름 ++ 크롬 로그인 양쪽에서,,, 전화번호로 로그인 해야되네
  };

  return (
    <div className="Info">
      <img className="hospitalImage" alt="hospitalImage" src={image} />
      <div className="InfoList">
        <p className="InfoText">{dutyAddr || address}</p>
        <p className="InfoText">{dutyName || title}</p>
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
