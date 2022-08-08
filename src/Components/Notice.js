import React from 'react'
import { useRecoilValue } from "recoil";
import {aidInfos} from "../Atoms/atoms";
import "../Styles/Info.scss";

const Notice = () => {
    const recoilValue = useRecoilValue(aidInfos); 

    const {notice} = recoilValue;

  return (
    <div className="Info">
    <img className="hospitalImage" /* alt="AidInfoImage" src={image}*/  />
    <div className="InfoList">
      <p className="InfoText">{notice}</p>
    </div>
  </div>
  )
}

export default Notice;