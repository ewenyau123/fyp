import React from "react";
import { station } from "../Theme";
import { ColorBar } from "./ColorBar";

interface Props {
    id: number;
    stationarray:Array<number>;
}

export const PropertyDisplay: React.FC<Props> = ({ id ,stationarray}) => {

    const txt: string | undefined = station.get(id)?.name;

    return (
        <React.Fragment>
            <ColorBar id={id} stationarray={stationarray}/>
            <div className="square-name">{txt}</div>
        </React.Fragment>
    );

};