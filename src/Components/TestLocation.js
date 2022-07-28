/*global kakao*/
import React, { useEffect, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import "../Styles/TestLocation.scss";
import { test } from "../Atoms/test";

const TestLocation = () => {
  const [x, setX] = useState(0); //목적지에 해당하는 x,y
  const [y, setY] = useState(0);

  const [myposx, setMyposx] = useState(0); //사용자 위치에 해당하는 x,y
  const [myposy, setMyposy] = useState(0);

  const setValue = useSetRecoilState(test); // 업데이트 함수만 가져올때

  //API에 따라 다르지만, 해당 좌표는 y,x로 들어가야함

  //순서 맞추기 작업 1. 일단 무조건 로컬 좌표 부터 2. 그 다음에 카카오 좌표

  const geocoder = new kakao.maps.services.Geocoder();
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
    const getCoordinate = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setTimeout(() => {
          setX(result[0].x);
          setY(result[0].y);

          const container = document.getElementById("map");
          console.log(y, x);
          console.log(myposy, myposx);

          const mapOption = {
            center: new kakao.maps.LatLng(myposy, myposx), //이것도 나중에 gps 값으로(y,x);
            level: 5,
          };

          const map = new kakao.maps.Map(container, mapOption); //그래서 맵을 만들고

          const markerPoints = [
            //마커를 여러개 찍을 건데, 우선은 사용자의 위치와 도착 병원의 좌표

            //여기서 서버에 받는 좌표들 값을 for문으로 돌려야됨
            {
              latlng: new kakao.maps.LatLng(myposy, myposx),
            },
            {
              latlng: new kakao.maps.LatLng(y, x),
            },
          ];

          for (let i = 0; i < markerPoints.length; i++) {
            let marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: markerPoints[i].latlng, // 마커를 표시할 위치, 이름은 표시 x
            });
            kakao.maps.event.addListener(marker, "click", function () {
              infowindow.open(map, marker);

              //상세페이지로 넘어가는 역할
            });
          }
          const iwContent = `<div style="width: 10px">병원 정보, 라우팅 </div>`,
            iwRemoveable = true;
          // 인포윈도우에 표출될 내용

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });
        });
      }
    };
    geocoder.addressSearch(
      "경기도 용인시 처인구 백옥대로1082번길 18",
      //여기는 서버에서 받은 병원의 이름을 넣어야 됨(도로명으로 다) //여기서 싱크 안맞을 테니까 연동하면 axios.then으로 넘기자 ..
      getCoordinate
    );

    setValue({
      y: y,
      x: x,
      myposy: myposy,
      myposx: myposx,
    });
  }, [x]);

  return <div id="map" className="TestLocation"></div>;
};
export default TestLocation;
