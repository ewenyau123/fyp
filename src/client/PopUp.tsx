import React, { useState } from "react";
import axios from "axios";
import { ConfigData } from "./SquareData";
import { Square } from "./Square";

interface Props {
    toggle: () => void;
    setter: (scoreplayer1: any,
        scoreplayer2: any,
        scoreplayer3: any,
        scoreplayer4: any,
        savingplayer1: any,
        savingplayer2: any,
        savingplayer3: any,
        savingplayer4: any) => void;
    question: Object | any;
    place: Array<number>;
    buttonshow: boolean;
    setarray: (array: any) => void;
    stationarray: Array<number>;
    player: number;
    rentshow: boolean;
    owner: any;
    setquestionseen: () => void;
}

export const Popup: React.FC<Props> = ({ toggle, question, setquestionseen, setter, owner, place, player, rentshow, buttonshow, setarray, stationarray }) => {

    const [answer, setanswer] = useState<string>();
    const [questionshow, setquestionshow] = useState<boolean>(true)
    const [message, setmessage] = useState<string>();

    const square: Square = ConfigData.get(place[player])?.type!;

    const squareClass = new Map<Square, string>([
        [Square.Airport, "airport"], [Square.Chance, "chance"], [Square.Go, "passgo"],
        [Square.GoToJail, "go-to-jail"], [Square.Jail, "jail"], [Square.Property, "property"],
        [Square.CentralPark, "central-park"], [Square.Utility, "utility"]
    ]);
    squareClass.get(square)

    const buyporperty = () => {
        axios.post("http://127.0.0.1:4000/buyporperty", {
            station: place,
            player: player
        }).then(
            () => {
                alert("success")
                console.log(stationarray)
                let dataarray = stationarray;
                dataarray.push(place[player]);
                setarray(dataarray);
                axios.post("http://127.0.0.1:4000/deductsaving", {
                    player: player
                }).then(() => {
                    axios.post("http://127.0.0.1:4000/getstudent", {
                        student: player
                    }).then((data) => {
                        setter(data.data[0].score,
                            data.data[1].score,
                            data.data[2].score,
                            data.data[3].score,
                            data.data[0].saving,
                            data.data[1].saving,
                            data.data[2].saving,
                            data.data[3].saving)
                        setquestionseen();
                    })
                })

            }
        )
    }
    const sellporperty = () => {
        axios.post("http://127.0.0.1:4000/sellporperty", {
            station: place,
        }).then(
            () => {
                alert("success")
                console.log(stationarray)
                axios.get("http://127.0.0.1:4000/getstation").then((data) => {
                    console.log(data)
                    let dataarray: Array<number> = []
                    data.data.forEach((item: any) => {
                        if (item.sold === 0) {
                            dataarray?.push(item.station_id - 30000)
                        }
                    });
                    setarray(dataarray)
                }).then(()=>{
                    axios.post("http://127.0.0.1:4000/addsaving", {
                        player: player
                    }).then(() => {
                        axios.post("http://127.0.0.1:4000/getstudent", {
                            student: player
                        }).then((data) => {
                            setter(data.data[0].score,
                                data.data[1].score,
                                data.data[2].score,
                                data.data[3].score,
                                data.data[0].saving,
                                data.data[1].saving,
                                data.data[2].saving,
                                data.data[3].saving)
                            setquestionseen();
                        })
                    })
                })
                
            }
        )
    }

    const handleSubmit = () => {
        let correctanswer = question["answers"];
        console.log(question)
        if (answer === correctanswer) {
            setmessage("Correct")
            axios.post("http://127.0.0.1:4000/addscore", {
                diff: question["difficulty"],
                student: player
            }).then(() => {
                axios.post("http://127.0.0.1:4000/getstudent", {
                    student: player
                }).then((data) => {
                    console.log("hi")
                    console.log(data)
                    setter(data.data[0].score,
                        data.data[1].score,
                        data.data[2].score,
                        data.data[3].score,
                        data.data[0].saving,
                        data.data[1].saving,
                        data.data[2].saving,
                        data.data[3].saving)
                })
            }
            )
        }
        else {
            setmessage("Incorrect! The correct answer is "+correctanswer)
            axios.post("http://127.0.0.1:4000/deductscore", {
                diff: question["difficulty"],
                student: player
            }).then(() => {
                axios.post("http://127.0.0.1:4000/getstudent", {
                    student: "20001"
                }).then((data) => {
                    console.log("hi")
                    setter(data.data[0].score,
                        data.data[1].score,
                        data.data[2].score,
                        data.data[3].score,
                        data.data[0].saving,
                        data.data[1].saving,
                        data.data[2].saving,
                        data.data[3].saving)
                })
            }
            )
        }

        setquestionshow(false)
    }

    const payrent = () => {
        console.log(player)
        console.log(place[player]);
        axios.post("http://127.0.0.1:4000/payrent", {
            student: player
        }
        ).then(() => {
            alert("paid");
            axios.post("http://127.0.0.1:4000/getstudent", {
                student: "20001"
            }).then((data) => {
                console.log("hi")
                setter(data.data[0].score,
                    data.data[1].score,
                    data.data[2].score,
                    data.data[3].score,
                    data.data[0].saving,
                    data.data[1].saving,
                    data.data[2].saving,
                    data.data[3].saving)
                setquestionseen();
            })
        })
    }

    let popupmessage = <div>
        <h3>Question:</h3>
        {question["question"]}
        <br />
        <label>
            <input type="text" name="name" onChange={
                (
                    ev: React.ChangeEvent<HTMLInputElement>,
                ): void => setanswer(ev.target.value)} />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
    </div>
    let buttonset = <div></div>
    if (buttonshow === true) {
        buttonset =
            <div>
                <button className="button" onClick={buyporperty}>Buy Porperty</button>
                {/* <button className="button">Sell Porperty</button> */}
            </div>
    }
    else {
        buttonset =
            <div>
                it is not Porperty.
        </div>
    }
    const rentmessge = <div>
        <h3>This porperty is owned by someone, you need to pay rent</h3>
        <button className="button" onClick={payrent}>Pay Rent</button>
    </div>

    const soldmessage = <div>
        <h3>This porperty is owned by you, Do you want to sold it?</h3>
        <button className="button" onClick={sellporperty}>Sell Porperty</button>
        <button className="button" onClick={toggle}>Cancel</button>
    </div>
    console.log(questionshow);
    console.log(rentshow);
    if (questionshow === false) {
        if (rentshow === true) {
            if (player == owner) {
                popupmessage = <div>
                    <h3>{message}</h3>
                    {soldmessage}
                </div>
            }
            else {
                popupmessage = <div>
                    <h3>{message}</h3>
                    {rentmessge}
                </div>
            }
        }
        else {
            popupmessage = <div>
                <h3>{message}</h3>
                {buttonset}
            </div>
        }

    }


    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={toggle}>
                    &times;
                </span>
                {popupmessage}
            </div>
        </div>
    );

};