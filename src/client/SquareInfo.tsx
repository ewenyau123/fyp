import React from "react";
import { ConfigData } from "./SquareData";
import { Square } from "./Square";
import { AirportDisplay } from "./squares/AirportDisplay";
import { ChanceDisplay } from "./squares/ChanceDisplay";
import { PropertyDisplay } from "./squares/PropertyDisplay";
import { CentralParkDisplay } from "./squares/CentralParkDisplay";
import { GoDisplay } from "./squares/GoDisplay";
import { UtilityDisplay } from "./squares/UtilityDisplay";


interface Props {
    id: number;
    stationarray:Array<number>;
}

export const SquareInfo: React.FC<Props> = ({ id,stationarray }) => {

    const type: Square | undefined = ConfigData.get(id)?.type;

    const getInfo = () => {
        if (type === Square.Airport) {
            return <AirportDisplay id={id} />
        }
        if (type === Square.Chance) {
            return <ChanceDisplay id={id} />
        }
        if (type === Square.CentralPark) {
            return <CentralParkDisplay id={id} />
        }
        if (type === Square.Go) {
            return <GoDisplay id={id} />
        }
        if (type === Square.Utility) {
            return <UtilityDisplay id={id} />
        }

        if (type === Square.Jail || type === Square.GoToJail) {
            return null;
        }

        return <PropertyDisplay id={id} stationarray={stationarray}/>
    };


    return (
        getInfo()
    );

};