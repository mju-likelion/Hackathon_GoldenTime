
import React from 'react'
import { useRecoilValue, useSetRecoilState } from "recoil";
import {aidInfos} from "../Atoms/atoms";
import "../Styles/Info.scss";

const AidInfo = () => {

    const recoilValue = useRecoilValue(aidInfos); 
   
    const {firstAid} = recoilValue;
  return (
    <div className="Info">
    <img className="hospitalImage" /* alt="AidInfoImage" src={image}*/ />
    <div className="InfoList">
      <p className="InfoText">{firstAid}</p>

    </div>
  );
};

export default AidInfo;
