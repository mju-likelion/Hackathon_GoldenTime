import React from 'react'
import { useRecoilValue } from "recoil";
import {aidInfos} from "../Atoms/atoms";
import "../Styles/Info.scss";


const AidInfo = () => {
    const recoilValue = useRecoilValue(aidInfos); 
    console.log(recoilValue)

    const {firstaid} = recoilValue;

  return (
    <div className="Info">
    <img className="hospitalImage" /* alt="AidInfoImage" src={image}*/ />
    <div className="InfoList">
      <p className="InfoText">{firstaid}</p>
    </div>
  </div>
  )
}

export default AidInfo