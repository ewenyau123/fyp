import React from "react";
import axios from "axios";


interface Props {
    toggle: () => void;
    score: Array<number>;
    saving: Array<number>;
}

export const ResultPopUp: React.FC<Props> = ({ toggle, score, saving }) => {
    const maxscore = score.indexOf(Math.max(...score))+1;
    const maxsaving = saving.indexOf(Math.max(...saving))+1;  

    let resultmessage = <div>
            Player {maxscore} has the highest score.
            Player {maxsaving} has the highest saving.
            <br/>
            <h3>The Winner is Player {maxscore}</h3>
    </div>


    return (
        <div className="modal">
            <div className="modal_content">
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Player1</th>
                            <th>Player2</th>
                            <th>PLayer3</th>
                            <th>PLayer4</th>
                        </tr>
                        <tr>
                            <td>Score</td>
                            <td>{score[0]}</td>
                            <td>{score[1]}</td>
                            <td>{score[2]}</td>
                            <td>{score[3]}</td>
                        </tr>
                        <tr>
                            <td>Saving</td>
                            <td>{saving[0]}</td>
                            <td>{saving[1]}</td>
                            <td>{saving[2]}</td>
                            <td>{saving[3]}</td>
                        </tr>
                    </tbody>

                </table>
                {resultmessage}
                <button className="button" onClick={toggle}>
                    New Game
            </button>
            </div>
        </div>
    )
}