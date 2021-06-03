import React, {  useState } from "react";
import axios from "axios";


interface Props {
    toggleproperty: () => void;
    id:number;
}

export const PopupPro: React.FC<Props> = ({ toggleproperty,id }) => {

    const [answer,setanswer] = useState<string>();
    const [questionshow, setquestionshow] = useState<boolean>(true)
    const [message,setmessage]=useState<string>();


    let popupmessage = <div>

        <h3>Question:</h3>
        
        <br />
        <label>
            <input type="text" name="name" onChange={
                (
                    ev: React.ChangeEvent<HTMLInputElement>,
                ): void => setanswer(ev.target.value)} />
        </label>
        <br />
        <button >Submit</button>
    </div>
    if (questionshow === false) {
        popupmessage = <div>
            <h3>{message}</h3>
        </div>
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={toggleproperty}>
                    &times;
          </span>
                {popupmessage}
            </div>
        </div>
    );

};