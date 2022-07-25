/*global kakao*/

import React, { useEffect, useState, useCallback } from "react";
import "../Styles/TestLocation.scss";

const TestLocation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [myposx, setMyposx] = useState(0);
  const [myposy, setMyposy] = useState(0);
  let polylinePath = [
    new kakao.maps.LatLng(myposy, myposx),
    new kakao.maps.LatLng(37.23289337377647, 127.20432065835702),
    new kakao.maps.LatLng(37.23319495312438, 127.21033552762782),
    new kakao.maps.LatLng(37.232166110650624, 127.21145067675457),
    new kakao.maps.LatLng(37.23215274661114, 127.21079718013738), //이거 중간을 네비게이션을 통해서 계속 리스트로 추가해야됨
    new kakao.maps.LatLng(y, x),
  ];
  //mypos는 사용자 좌표를 받는건데, 이것도 마찬가지로 y,x 순서로 렌더링 되어야함
  useEffect(() => {
    //이거 근데 나중에 콜백으로 바꿔야하는거 아닌가?
    function getLocation() {
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

    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(myposy, myposx),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(y, x),
      },
    ];
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        //image: markerImage, // 마커 이미지
      });
    }

    // const markerPosition = new kakao.maps.LatLng(myposy, myposx);
    // const markerPosition1 = new kakao.maps.LatLng(y, x);
    // const marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // const destmarker = new kakao.maps.Marker({
    //   position: markerPosition1,
    // });

    //marker.setMap(map);
    // destmarker.setMap(map);

    const iwContent = `<div style="width: 30px">${myposx} ${myposy}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true;
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });
    kakao.maps.event.addListener(marker, "click", function (e) {
      infowindow.open(map, marker);
      // 마커 위에 이벤트 추가
      console.log(myposy, myposx); //위 경도 프랍스 서버로 넘기는거 테스트
      console.log("클릭이 되었어염"); //이거 나중에 서버에서 데이터 받을 때 상세페이지로 넘어가는 역할 (프론트에선 일단 라우팅만 하면될듯)
    });

    const polyline = new kakao.maps.Polyline({
      path: polylinePath, //좌표배열
      strokeColor: "#FF0000", //선의 색 빨강
      strokeOpacity: 0.8, //선의 투명도
      strokeWeight: 6, //선의 두께
      map: map, //만들어 놓은 지도
    });
    polyline.setMap(map);
  }, []); //이거 빈배열로 하면 렌더링 할 때만 이뤄져서 이건 나중에 수정

  return (
    <>
      <div id="map" className="TestLocation"></div>
      <div id="mapp"></div>
    </>
  );
};
export default TestLocation;
