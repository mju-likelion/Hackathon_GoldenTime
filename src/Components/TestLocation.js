/*global kakao*/
/*이거 없으면 컴파일 오류 나옴*/
import React, { useEffect, useState,useCallback } from "react";
import "../Styles/TestLocation.scss";

const TestLocation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [myposx, setMyposx] = useState(0);
  const [myposy, setMyposy] = useState(0);
  //mypos는 사용자 좌표를 받는건데, 이것도 마찬가지로 y,x 순서로 렌더링 되어야함
  useEffect(() => { //이거 근데 나중에 콜백으로 바꿔야하는거 아닌가? 
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log(
              position.coords.latitude + " " + position.coords.longitude
            );
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
    }
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
      "경기도 용인시 처인구 백옥대로1082번길 18", //여기는 서버에서 받은 병원의 좌표를 받아야됨
      getCoordinate
    );
    const container = document.getElementById("map");
    console.log(x); // 디버깅용
    console.log(y); // 디버깅용
    const options = {
      center: new kakao.maps.LatLng(myposy, myposx),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(myposy, myposx);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    const iwContent = `<div style="width: 30px">${myposx} ${myposy}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true;
    const infowindow = new kakao.maps.InfoWindow({
      content : iwContent,
      removable : iwRemoveable
  });
    kakao.maps.event.addListener(marker, "click", function (e) {
      
      infowindow.open(map, marker);  
      // 마커 위에 이벤트 추가
      console.log(myposy,myposx); //위 경도 프랍스 서버로 넘기는거 테스트 
      console.log("클릭이 되었어염"); //이거 나중에 서버에서 데이터 받을 때 상세페이지로 넘어가는 역할 (프론트에선 일단 라우팅만 하면될듯)
    });
  }); //이거 빈배열로 하면 렌더링 할 때만 이뤄져서 이건 나중에 수정

  return <div id="map" className="TestLocation"></div>;
};
export default TestLocation;
