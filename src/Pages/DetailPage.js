
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const SelectSymtom = useSetRecoilState(aidInfos);     


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
    SelectSymtom({
      notice: data.data[0].notice,
      firstAid: data.data[0].firstAid
    });
    console.log(data);
   });
  });

  const goFirstAid = useCallback(() => {
    getsymtomdata();
    SelectSymtom({
    });
  },[symptom]);



  return (
    <div>
      <Title name="응급실 찾기" />
      <p className="chocieText">검색 결과</p>
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      {!modal && <DetailInfo />}
      {!modal && <p className="chocieText">추천 최단 경로</p>}
      {!modal && <LoadRoute name="TestLocation" />}

      {!modal && (
        <button className="ModalButton" onClick={OpenMap}>
          지도에서 보기
        </button>
      )}

      {modal && <LoadRoute name="TestLocation1" />}
      {modal && (
        <button className="ModalButton" onClick={CloseMap}>
          화면으로 보기
        </button>
      )}
      <button className="LastButton" onClick={goFirstAid}>
        응급 조치 정보
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;





