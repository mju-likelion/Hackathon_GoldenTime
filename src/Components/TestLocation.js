/*global kakao*/
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../Styles/TestLocation.scss";

const TestLocation = () => {
  const API_KEY = process.env.REACT_APP_ROUTE_API_KEY;

  const [x, setX] = useState(0); //목적지에 해당하는 x,y
  const [y, setY] = useState(0);

  const [myposx, setMyposx] = useState(0); //사용자 위치에 해당하는 x,y
  const [myposy, setMyposy] = useState(0);

  const [routex, setRoutex] = useState([]); //두 위치에 따른 경로를 위한 좌표들의 배열
  const [routey, setRoutey] = useState([]);

  //API에 따라 다르지만, 해당 좌표는 y,x로 들어가야함

  //순서 맞추기 작업 1. 일단 무조건 로컬 좌표 부터 2. 그 다음에 카카오 좌표

  const geocoder = new kakao.maps.services.Geocoder();
  useEffect(() => {
    const getCoordinate = (result, status) => {
      if (status === kakao.maps.services.Status.OK && result) {
        console.log(result);
        setX(result[0].x);
        setY(result[0].y);
        console.log(x, y);
        const container = document.getElementById("map");

        const mapOption = {
          center: new kakao.maps.LatLng(37.225337463214764, 127.18564851207637), //이것도 나중에 gps 값으로(y,x);
          level: 5,
        };

        const map = new kakao.maps.Map(container, mapOption); //그래서 맵을 만들고

        const markerPoints = [
          //마커를 여러개 찍을 건데, 우선은 사용자의 위치와 도착 병원의 좌표
          {
            latlng: new kakao.maps.LatLng(
              37.225337463214764,
              127.18564851207637
            ),
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

        const dest = `${y},${x}`;
        console.log(dest);

        const polylinePath = [
          //경로 추천할 때 사용할 배열, 첫 시작은 사용자 위치 ,  마지막 위치는 응급실 위치
        ];
        const sendData = {
          origin: "127.18564851207637 ,37.225337463214764", //이거 나중에 현재 위치 좌표값으로 변경
          destination: "127.211398448325,37.2315421543466", //이거 나중에 목적지 좌표값으로 변경
          priority: "DISTANCE", // 거리를 기준으로 경로 추천
        };

        const option = {
          method: "GET",
          url: "https://apis-navi.kakaomobility.com/v1/directions?",
          headers: {
            Authorization: `KakaoAK ${API_KEY}`,
          },
          params: sendData,
        };

        axios(option).then(({ data }) => {
          const navigateInfo = data.routes[0].sections[0]; //네비 게이션 도로명 리스트
          for (
            let section = 0;
            section < navigateInfo.roads.length;
            section++
          ) {
            const navigatePoint = navigateInfo.roads[section].vertexes; //도로명에 따른 경로 좌표
            for (let vertexe = 0; vertexe < navigatePoint.length; vertexe++) {
              if (vertexe % 2 === 0) {
                const tempy = navigatePoint[vertexe];
                setRoutey(routey.push(tempy));
              } else {
                const tempx = navigatePoint[vertexe];
                setRoutex(routex.push(tempx));
              }
            }
          }

          for (let route = 0; route < routex.length; route++) {
            const routeObject = new kakao.maps.LatLng(
              routex[route],
              routey[route]
            );
            polylinePath.push(routeObject);
          }

          const distance = navigateInfo.distance; //예상 거리
          const duration = navigateInfo.duration; //예상 시간(초)

          //동기,비동기 속도 차이로 인한 빈배열 이슈

          const polyline = new kakao.maps.Polyline({
            path: polylinePath, //좌표배열
            strokeColor: "#FF7F00", //선의 색 빨강
            strokeOpacity: 0.8, //선의 투명도
            strokeWeight: 4, //선의 두께
            map: map, //만들어 놓은 지도
          });
          polyline.setMap(map);
          console.log("맵 다 그렸어용");
        });
      }
    };

    geocoder.addressSearch(
      "경기도 용인시 처인구 백옥대로1082번길 18",
      //여기는 서버에서 받은 병원의 이름을 넣어야 됨(도로명으로 다)
      getCoordinate
    );
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMyposx(position.coords.longitude);
            setMyposy(position.coords.latitude);
            console.log("gps 다 받았어용");
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
  }, []);

  return <div id="map" className="TestLocation"></div>;
};
export default TestLocation;
