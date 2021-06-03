import React from "react";
import { Section } from "./Section";
import { ConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { Square } from "./Square";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBIcon} from 'mdbreact';

interface Props {
  id: number;
  place:Array<number>;
  stationarray:Array<number>;
}

export const GameSquare: React.FC<Props> = ({ id,place,stationarray }) => {

  const section: Section = ConfigData.get(id)?.section!;
  const square: Square = ConfigData.get(id)?.type!;

  const sectionMap = new Map<Section, string>([
    [Section.Top, "top"], [Section.Right, "right"], [Section.Left, "left"], [Section.Bottom, "bottom"]
  ]);

  const squareClass = new Map<Square, string>([
    [Square.Airport, "airport"], [Square.Chance, "chance"], [Square.Go, "passgo"],
    [Square.GoToJail, "go-to-jail"], [Square.Jail, "jail"], [Square.Property, "property"],
    [Square.CentralPark, "central-park"], [Square.Utility, "utility"]
  ]);

  const getContainerClassName = () => {
    return "container container-" + sectionMap.get(section);
  };

  const getSquareClassName = () => {
    return "square " + squareClass.get(square);
  };
  const getSquareabsClassName = () => {
    return  "absolute " +squareClass.get(square) + " "+sectionMap.get(section);
  };

  const getSquareId = () => {
    return "game-square-" + id;
  };
  let icon1;
  let icon2;
  let icon3;
  let icon4;
  if (id===place[0]){
    icon1=<MDBIcon icon="chess-king" size="2x" className="tokenicon"/>
  }
  if (id===place[1]){
    icon2=<MDBIcon icon="car-side" size="2x" className="tokenicon"/>          
  }
  if (id===place[2]){
    icon3=<MDBIcon icon="motorcycle" size="2x" className="tokenicon"/>
  }
  if (id===place[3]){
    icon4=<MDBIcon icon="baby-carriage" size="2x" className="tokenicon"/>
  }
  return (
    <div className={getSquareClassName()} id={getSquareId()}>
      <div className={getContainerClassName()}>
        <SquareInfo id={id} stationarray={stationarray}/>
        <div className={getSquareabsClassName()}>
        {icon1}
        {icon2}
        {icon3}
        {icon4}

        </div>
        
      </div>
    </div>
  );

};
