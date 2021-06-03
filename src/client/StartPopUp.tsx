import React from "react";


interface Props {
    toggle: () => void;
}

export const StartPopUp: React.FC<Props> = ({ toggle}) => {
    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={toggle}>
                    &times;
            </span>
            <button className="button" onClick={toggle}>
                Start Game
            </button>
            </div>
        </div>
    )
}