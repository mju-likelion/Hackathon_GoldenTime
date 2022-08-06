import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Title from "../Components/Title";
import DetailInfo from "../Components/DetailInfo";
import LoadRoute from "../Components/LoadRoute";
import Select from "../Components/Select";
import { aidInfos, coordinates, selectData } from "../Atoms/atoms";
import "../Styles/Info.scss";
import axios from "axios";
import AidInfo from "../Components/AidInfo";

const DetailPage = () => {
  const { address, symptom } = useRecoilValue(selectData);
  const navigate = useNavigate();
  const [data,setData] = useState([]); 
  const SelectSymtom = useRecoilState(aidInfos)       // axios 로 서버에 받아오는 값
  

  /*[setAidinfo,Aidinfo] = useRecoilState(aidInfos);
setAidInfo({notice:data.notice})
setAidInfo({notice:data.notice,firstaid:data.firstaid})
생각을 해봤는데 이렇게 해서 리코일 밸류 셋팅 하는 구조인것 같은데... 잘모르겠어..
*/

  const getsymtomdata = useCallback(() => {
        const sendsymtomdata ={
          symptom:symptom,                            
        };

  const option = {
      method: "GET",  
      url:`http://15.164.159.158:3000/api/information/${symptom}`,
      parmas: sendsymtomdata
    };

  axios(option).then(({data})=> {  
    navigate("/aid");
    setData(data);
    console.log(data);
   });
  });

  const goFirstAid = useCallback(() => {
    getsymtomdata();
  },[symptom]);


  return (
    <div>
      <Title name="응급실 찾기" />
      <p className="chocieText">검색 결과</p>
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      <DetailInfo />
      <p className="chocieText">추천 최단 경로</p>
      <LoadRoute />
      <button className="LastButton" onClick={goFirstAid}>
        응급 조치 정보
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;





