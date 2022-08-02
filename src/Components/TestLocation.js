/*global kakao*/
import React, { useEffect, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import "../Styles/TestLocation.scss";
import { coordinates, infoData } from "../Atoms/atoms";
import marker from "../Datas/marker.png";

const TestLocation = ({ data }) => {
  const [x, setX] = useState(0); //목적지에 해당하는 x,y
  const [y, setY] = useState(0);

  const [myposx, setMyposx] = useState(0); //사용자 위치에 해당하는 x,y
  const [myposy, setMyposy] = useState(0);

  const setCoordinates = useSetRecoilState(coordinates); // 업데이트 함수만 가져올때
  const setInfoValue = useSetRecoilState(infoData);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMyposx(position.coords.longitude);
            setMyposy(position.coords.latitude);
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
        //이거 gps 요청 안하면 현재 위치 임의로 추가 해야되나?
      }
    };

    const getCoordinate = () => {
      setX(data[0].wgs84Lon);
      setY(data[0].wgs84Lat);

      const container = document.getElementById("map");
      //console.log(myposy, myposx);

      const mapOption = {
        center: new kakao.maps.LatLng(y, x),
        level: 7,
      };

      const map = new kakao.maps.Map(container, mapOption); //그래서 맵을 만들고

      const markerPoints = [];

      for (let i = 0; i < data.length; i++) {
        const { dutyAddr, dutyName, dutyTel3, wgs84Lat, wgs84Lon } = data[i];
        markerPoints.push({
          content: `<div>${dutyName}</div>`, // 이건 하드 코딩이긴한데, 서버랑 통신 열리면 반복문 돌려서 해당 형식 대로 다 리스트에 넣으면 유지 관리 가능
          value: {
            myposy: myposy,
            myposx: myposx,
            y: wgs84Lat,
            x: wgs84Lon,
            address: dutyAddr,
            title: dutyName,
            callNumber: dutyTel3,
          },
          latlng: new kakao.maps.LatLng(wgs84Lat, wgs84Lon), //이거 굳이 현재 좌표를 보여줄 필요가 있을까 ? 이거 나중에 의논 해보고
        });
      }
      setInfoValue(markerPoints[0].value);

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
          map: map, // 마커를 표시할 지도
          position: markerPoints[i].latlng, // 마커를 표시할 위치, 이름은 표시 x
          image: markerImage,
        });
        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker);
          setInfoValue(markerPoints[i].value);
          //상세페이지로 넘어가는 역할
        });

        //테스트 코드
        const iwRemoveable = true;
        const infowindow = new kakao.maps.InfoWindow({
          content: markerPoints[i].content,
          removable: iwRemoveable,
        });
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
    getCoordinate();
  }, [x, myposx]);

  return <div id="map" className="TestLocation"></div>;
};
export default TestLocation;
