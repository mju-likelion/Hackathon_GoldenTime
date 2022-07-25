/*global kakao*/
import React, { useEffect, useState, useCallback } from "react";
import "../Styles/TestLocation.scss";

const TestLocation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [myposx, setMyposx] = useState(0);
  const [myposy, setMyposy] = useState(0);

  const polylinePath = [
    new kakao.maps.LatLng(37.225337463214764, 127.18564851207637), //첫 시작은 사용자 위치로
    new kakao.maps.LatLng(37.225118408434966, 127.18598957902225),
    new kakao.maps.LatLng(37.22503190264724, 127.18782727504029),
    new kakao.maps.LatLng(37.22544746278464, 127.18798057870085),
    new kakao.maps.LatLng(37.22707010410253, 127.21073746069142),
    new kakao.maps.LatLng(37.23212465363484, 127.20928734953876),
    new kakao.maps.LatLng(37.23215274661114, 127.21079718013738), //이거 중간을 네비게이션을 통해서 계속 리스트로 추가해야됨
    new kakao.maps.LatLng(y, x), // 마지막은 응급실 위치로
  ]; //이거 나중에 데이터 받을 때 리스트로 보관

  //mypos는 사용자 좌표를 받는건데, 이것도 마찬가지로 y,x 순서로 렌더링 되어야함

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
      }
    };
    getLocation();
  });

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    const getCoordinate = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setX(result[0].x);
        setY(result[0].y);
      }
    };

    geocoder.addressSearch(
      "경기도 용인시 처인구 백옥대로1082번길 18",
      //여기는 서버에서 받은 병원의 좌표를 받아야됨
      getCoordinate
    );

    const container = document.getElementById("map");

    const options = {
      center: new kakao.maps.LatLng(37.225337463214764, 127.18564851207637), //이것도 나중에 gps 값으로
      level: 5,
    };

    const map = new kakao.maps.Map(container, options);

    const positions = [
      //이것도 나중엔 데이터 받아서 리스트로 관리
      {
        latlng: new kakao.maps.LatLng(37.225337463214764, 127.18564851207637),
      },
      {
        latlng: new kakao.maps.LatLng(y, x),
      },
    ];

    for (let i = 0; i < positions.length; i++) {
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title,
      });
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
        console.log(myposy, myposx); //위 경도 프랍스 서버로 넘기는거 테스트
        //상세페이지로 넘어가는 역할
      });
    }

    const iwContent = `<div style="width: 30px">${myposx} ${myposy}</div>`,
      // 인포윈도우에 표출될 내용
      iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    const polyline = new kakao.maps.Polyline({
      path: polylinePath, //좌표배열
      strokeColor: "#FF0000", //선의 색 빨강
      strokeOpacity: 0.8, //선의 투명도
      strokeWeight: 3, //선의 두께
      map: map, //만들어 놓은 지도
    });
    polyline.setMap(map);
  });

  return <div id="map" className="TestLocation"></div>;
};
export default TestLocation;
