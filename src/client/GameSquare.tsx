import React from "react";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { SquareType } from "./SquareType";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBIcon} from 'mdbreact';

interface Props {
  id: number;
  place:Array<number>;
  stationarray:Array<number>;
}

export const GameSquare: React.FC<Props> = ({ id,place,stationarray }) => {

  const section: BoardSection = SquareConfigData.get(id)?.section!;
  const squareType: SquareType = SquareConfigData.get(id)?.type!;

  const sectionMap = new Map<BoardSection, string>([
    [BoardSection.Top, "top"], [BoardSection.Right, "right"], [BoardSection.Left, "left"], [BoardSection.Bottom, "bottom"]
  ]);

  const squareTypeClass = new Map<SquareType, string>([
    [SquareType.Airport, "airport"], [SquareType.Chance, "chance"], [SquareType.Go, "passgo"],
    [SquareType.GoToJail, "go-to-jail"], [SquareType.Jail, "jail"], [SquareType.Property, "property"],
    [SquareType.CentralPark, "central-park"], [SquareType.Utility, "utility"]
  ]);

  const getContainerClassName = () => {
    return "container container-" + sectionMap.get(section);
  };

  const getSquareClassName = () => {
    return "square " + squareTypeClass.get(squareType);
  };
  const getSquareabsClassName = () => {
    return  "absolute " +squareTypeClass.get(squareType) + " "+sectionMap.get(section);
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
