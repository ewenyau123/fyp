import React from "react";
import { SquareConfigData, squareGroupColorMap } from "../SquareData";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBIcon} from 'mdbreact';

interface Props {
    id: number;
    stationarray:Array<number>;
}

export const ColorBar: React.FC<Props> = ({ id ,stationarray}) => {

    const groupId: number = SquareConfigData.get(id)?.groupId!;

    const getClassName = () => {
        return "square-color-bar " + squareGroupColorMap.get(groupId);
    };
    let icon=<div></div>
    if(stationarray.includes(id)){
        icon=<div><MDBIcon icon="building" size="2x" className="building"/></div>
    }



    return (
        <div className={getClassName()}>
            {icon}
        </div>
    );

};