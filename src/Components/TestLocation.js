/*global kakao*/
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import "../Styles/Info.scss";
import { coordinates, infoData } from "../Atoms/atoms";
import marker from "../Datas/marker.png";

const TestLocation = ({ data, name }) => {
  const [x, setX] = useState(0); //목적지에 해당하는 x,y
  const [y, setY] = useState(0);

  const [myposx, setMyposx] = useState(0); //사용자 위치에 해당하는 x,y
  const [myposy, setMyposy] = useState(0);

  const setCoordinates = useSetRecoilState(coordinates); //마커 이벤트가 형제 컴포넌트 이므로 전역 상태 관리를 통한 데이터 유지
  const setInfoValue = useSetRecoilState(infoData);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMyposx(position.coords.longitude);
            setMyposy(position.coords.latitude);
            getCoordinate(); //콜백
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    };

    const getCoordinate = () => {
      if (data[0]) {
        setX(data[0].wgs84Lon);
        setY(data[0].wgs84Lat);

        const container = document.getElementById("map");

        const mapOption = {
          center: new kakao.maps.LatLng(y, x),
          level: 7,
        };

        const map = new kakao.maps.Map(container, mapOption);

        const markerPoints = [];

        for (let i = 0; i < data.length; i++) {
          const { dutyAddr, dutyName, dutyTel3, wgs84Lat, wgs84Lon, image } =
            data[i];
          markerPoints.push({
            content: `<div>${dutyName}</div>`,
            value: {
              myposy: myposy,
              myposx: myposx,
              y: wgs84Lat,
              x: wgs84Lon,
              address: dutyAddr,
              title: dutyName,
              callNumber: dutyTel3,
              image: image,
            },
            latlng: new kakao.maps.LatLng(wgs84Lat, wgs84Lon),
          });
        }
        //setInfoValue(markerPoints[0].value); -> 이거 공유하고 삭제하고

        const markerSrc = marker;
        const markerSize = new kakao.maps.Size(48, 48);
        const markerOption = { offset: new kakao.maps.Point(27, 58) };

        const markerImage = new kakao.maps.MarkerImage(
          markerSrc,
          markerSize,
          markerOption
        );
        for (let i = 0; i < markerPoints.length; i++) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: markerPoints[i].latlng,
            image: markerImage,
          });
          kakao.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
            setInfoValue(markerPoints[i].value);
            //상세페이지로 넘어가는 역할
          });

          const iwRemoveable = true;
          const infowindow = new kakao.maps.InfoWindow({
            content: markerPoints[i].content,
            removable: iwRemoveable,
          });
        }
      } else {
        alert("죄송합니다 현재 입력하신 데이터에 부응하는 정보가 없습니다.");
        window.location.replace("/");
      }
    };

    setCoordinates({
      //마커 이벤트를 위한 전역 관리 기반 경로 추천
      y: y,
      x: x,
      myposy: myposy,
      myposx: myposx,
    });

    getLocation();
  }, [x, myposx, data]); //의존성 부여로 인한 재렌더링 통제

  return <div id="map" className={name}></div>;
};
export default TestLocation;
