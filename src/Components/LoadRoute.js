/*global kakao*/
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import "../Styles/TestLocation.scss";
import { test } from "../Atoms/test";

//받아야 되는 값들이 병원 상세 정보, 사용자 위치 -> 서버랑 통신할 때 recoil로 관리 하면 될 듯

const LoadRoute = () => {
  const API_KEY = process.env.REACT_APP_ROUTE_API_KEY;
  const [routex, setRoutex] = useState([]); //두 위치에 따른 경로를 위한 좌표들의 배열
  const [routey, setRoutey] = useState([]);
  const recoilValue = useRecoilValue(test); // 해당 atom의 값
  const { myposx, myposy, x, y } = recoilValue;
  console.log(myposx);

  useEffect(() => {
    const container = document.getElementById("map");

    const mapOption = {
      center: new kakao.maps.LatLng(myposy, myposx), //이것도 나중에 gps 값으로(y,x);
      level: 5,
    };

    const map = new kakao.maps.Map(container, mapOption); //그래서 맵을 만들고

    console.log(recoilValue);

    const polylinePath = [
      //경로 추천할 때 사용할 배열, 첫 시작은 사용자 위치 ,  마지막 위치는 응급실 위치
    ];

    const sendData = {
      origin: `${myposx},${myposy}`, //이거 나중에 현재 위치 좌표값으로 변경
      destination: `${x},${y}`, //이거 나중에 목적지 좌표값으로 변경
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
      for (let section = 0; section < navigateInfo.roads.length; section++) {
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
        const routeObject = new kakao.maps.LatLng(routex[route], routey[route]);
        polylinePath.push(routeObject);
      }

      const distance = navigateInfo.distance; //예상 거리
      const duration = navigateInfo.duration; //예상 시간(초)

      const polyline = new kakao.maps.Polyline({
        path: polylinePath, //좌표배열
        strokeColor: "#ff0000", //선의 색 빨강
        strokeOpacity: 0.7, //선의 투명도
        strokeWeight: 3.5, //선의 두께
        map: map, //만들어 놓은 지도
      });
      polyline.setMap(map);
    });
  }, []);

  return <div id="map" className="TestLocation" />;
};

export default LoadRoute;
