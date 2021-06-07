import React, { useState, useEffect } from "react";
import { GameSquare } from "./GameSquare";
import axios from "axios";
import { Popup } from "./PopUp";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ConfigData } from "./SquareData";
import { Square } from "./Square";
import { station } from "./Theme";
import { StartPopUp } from "./StartPopUp"
import { ResultPopUp } from "./ResultPopUp";


export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  const [questionseen, setquestionseen] = useState<boolean>(false);
  const [stationarray, setstationarray] = useState<Array<number>>([])
  const [property, setproperty] = useState<boolean>(false);
  const [question, setquestion] = useState();
  const [place, setplace] = useState<Array<number>>([1, 1, 1, 1]);
  const [player, setplayer] = useState<number>(0);
  const [gws, setws] = useState<W3CWebSocket>();
  const [score, setscore] = useState<Array<number>>([]);
  const [target, settarget] = useState<number>(3000);
  const [money, setmoney] = useState<Array<number>>([]);
  const [buttonshow, setbuttonshow] = useState<boolean>(false)
  const square: Square = ConfigData.get(place[player])?.type!;
  const [message, setmessage] = useState<String>("Player 1 Turn");
  const [start, setstart] = useState<boolean>(true);
  const [score1, setscore1] = useState<number>(0);
  const [score2, setscore2] = useState<number>(0);
  const [score3, setscore3] = useState<number>(0);
  const [score4, setscore4] = useState<number>(0);
  const [saving1, setsaving1] = useState<number>(0);
  const [saving2, setsaving2] = useState<number>(0);
  const [saving3, setsaving3] = useState<number>(0);
  const [saving4, setsaving4] = useState<number>(0);
  const [rentshow, setrentshow] = useState<boolean>(false);
  const [owner, setowner] = useState<any>();
  const [endgame, setendgame] = useState<boolean>(false);

  const squareClass = new Map<Square, string>([
    [Square.Airport, "airport"], [Square.Chance, "chance"], [Square.Go, "passgo"],
    [Square.GoToJail, "go-to-jail"], [Square.Jail, "jail"], [Square.Property, "property"],
    [Square.CentralPark, "central-park"], [Square.Utility, "utility"]
  ]);
  squareClass.get(square)
  const connect = () => {
    const ws = new W3CWebSocket("ws://172.16.8.145:4000/ws");

    console.log("ws", ws)

    ws.onopen = () => {

      console.log("connected websocket main component");
      setws(ws);

    }

    ws.onclose = e => {
      console.log("Socket is closed and reconnect");
      setTimeout(() => {
        check();
      }, 5000);
    }

    ws.onerror = err => {
      console.error("Socket error and closing");
      ws.close();
    }
    ws.onmessage = (message) => {
      console.log(message)
    }
  }
  const check = () => {
    console.log("check")
    if (!gws || gws.readyState === W3CWebSocket.CLOSED) {
      connect();
    }
  }

  const rolldice = () => {
    const max: number = 6;
    const min: number = 1;
    let difficult: number = Math.floor(Math.random() * (max - min + 1) + min);
    let stationdetail: String = "";
    console.log(difficult)
    // difficult = 3;
    let position = place[player] + difficult
    let playerplace = place
    if (position > 40) {
      position = position - 40
      playerplace[player] = position
      setplace(playerplace);
    }
    else {
      playerplace[player] = position
      setplace(playerplace)
    }
    console.log(place)
    axios.get('http://127.0.0.1:4000/getquestion', { params: { difficult: difficult } }).then((result) => {
      const question_set = result.data;
      const question_no = Math.floor(Math.random() * (question_set.length - min + 1) + min) - 1;
      console.log(question_set[question_no])
      setquestion(question_set[question_no])
      setquestionseen(!questionseen)
      console.log(question)
    }
    )
    axios.get('http://127.0.0.1:4000/getstationdetail', { params: { station: place[player] } }).then((result) => {
      console.log(result.data.length);
      if (result.data.length !== 0) {
        stationdetail = result.data[0].sold;
        setowner(result.data[0].owner);
        console.log(stationdetail)
      }
    }
    ).then(() => {

      console.log(place[player]);

      const square: Square = ConfigData.get(place[player])?.type!;
      console.log(squareClass.get(square))
      if (squareClass.get(square) === "property") {
        if (stationdetail == "0") {
          setbuttonshow(false);
          setrentshow(true);
        }
        else {
          setbuttonshow(true);
          setrentshow(false);
        }
      }
      else if (squareClass.get(square) === "chance") {
        const max: number = 6;
        const min: number = 1;
        let difficult: number = Math.floor(Math.random() * (max - min + 1) + min);
        // difficult = 3;
        let position = place[player] + difficult
        let playerplace = place
        if (position > 40) {
          position = position - 40
          playerplace[player] = position
          setplace(playerplace);
        }
        else {
          playerplace[player] = position
          setplace(playerplace)
        }
      }
      else if(squareClass.get(square) === "airport"){
        axios.post("http://127.0.0.1:4000/payrent", {
            student: player
        }).then(() => {
          alert("paid");
          axios.post("http://127.0.0.1:4000/getstudent", {
          }).then((data) => {
              setter(data.data[0].score,
                  data.data[1].score,
                  data.data[2].score,
                  data.data[3].score,
                  data.data[0].saving,
                  data.data[1].saving,
                  data.data[2].saving,
                  data.data[3].saving)
          })
      })
      }
      else {
        setbuttonshow(false);
        setrentshow(false);
      }
    })
  }
  const togglePop = () => {
    setquestionseen(!questionseen);
    let playerno = player + 1;
    if (playerno > 3) {
      playerno = 0;
    }
    setplayer(playerno);
    console.log(playerno);
    let messageplayer=playerno+1;
    setmessage("Player "+ messageplayer+ " Turn")
    gamecheck();
  };
  const toggleStartPop = () => {
    setstart(!start);
  };
  const resulttoggle = () => {
    setendgame(!endgame);
    setmessage("Player 1 Turn");
    axios.post("http://127.0.0.1:4000/win", {
        winner:score.indexOf(Math.max(...score))
        }).then((data) => {
          
        
    axios.get('http://127.0.0.1:4000/initgame').then((result) => {
      console.log(result)
    }
    ).then(() => {
      axios.get('http://127.0.0.1:4000/initstudent').then((result) => {
        console.log(result)
      }
      ).then(() => {
        axios.post("http://127.0.0.1:4000/getstudent", {
        }).then((data) => {
          console.log(data.data)
          setter(data.data[0].score,
            data.data[1].score,
            data.data[2].score,
            data.data[3].score,
            data.data[0].saving,
            data.data[1].saving,
            data.data[2].saving,
            data.data[3].saving)
        })
        axios.get("http://127.0.0.1:4000/getstation").then((data) => {
          console.log(data)
          let dataarray: Array<number> = []
          data.data.forEach((item: any) => {
            if (item.sold === 0) {
              dataarray?.push(item.station_id - 30000)
            }
          });
          setarray(dataarray)
        })
        
      })

    })
  })
    setplace([1, 1, 1, 1]);
    setplayer(0);
  }

  const settingEnd = (check: boolean) => {
    setendgame(check);
    let informationscore: Array<number> = [score1, score2, score3, score4];
    let informationsaving: Array<number> = [saving1, saving2, saving3, saving4];
    setscore(informationscore);
    setmoney(informationsaving);
  }

  const gamecheck = () => {
    if (score1 === target) {
      settingEnd(true);
    }
    if (score2 === target) {
      settingEnd(true);
    }
    if (score3 === target) {
      settingEnd(true);
    }
    if (score4 === target) {
      settingEnd(true);
    }
    if (score1 <= 0) {
      settingEnd(true);
    }
    if (score2 <= 0) {
      settingEnd(true);
    }
    if (score3 <= 0) {
      settingEnd(true);
    }
    if (score4 <= 0) {
      settingEnd(true);
    }
    if (saving1 === 0) {
      settingEnd(true);
    }
    if (saving2 === 0) {
      settingEnd(true);
    }
    if (saving3 === 0) {
      settingEnd(true);
    }
    if (saving4 === 0) {
      settingEnd(true);
    }
  }
  const setter = (
    scoreplayer1: any,
    scoreplayer2: any,
    scoreplayer3: any,
    scoreplayer4: any,
    savingplayer1: any,
    savingplayer2: any,
    savingplayer3: any,
    savingplayer4: any
  ) => {
    console.log('called setScore', scoreplayer1)
    setscore1(scoreplayer1);
    setscore2(scoreplayer2);
    setscore3(scoreplayer3);
    setscore4(scoreplayer4);
    setsaving1(savingplayer1);
    setsaving2(savingplayer2);
    setsaving3(savingplayer3);
    setsaving4(savingplayer4);
  };

  const setarray = (array: any) => {
    setstationarray(array)
  }

  const closequestionseen=()=>{
    setquestionseen(!questionseen);
    let playerno = player + 1;
    if (playerno > 3) {
      playerno = 0;
    }
    setplayer(playerno);
    console.log(playerno);
    let messageplayer=playerno+1;
    setmessage("Player "+ messageplayer+ " Turn")
    gamecheck();
  }
  useEffect(() => {
    axios.post("http://127.0.0.1:4000/getstudent", {
      student: "20001"
    }).then((data) => {
      console.log(data.data)
      setter(data.data[0].score,
        data.data[1].score,
        data.data[2].score,
        data.data[3].score,
        data.data[0].saving,
        data.data[1].saving,
        data.data[2].saving,
        data.data[3].saving)
    })
    axios.get("http://127.0.0.1:4000/getstation").then((data) => {
      console.log(data)
      let dataarray: Array<number> = []
      data.data.forEach((item: any) => {
        if (item.sold === 0) {
          dataarray?.push(item.station_id - 30000)
        }
      });
      setarray(dataarray)
    })
    connect();
  }, [])
  console.log(stationarray)
  return (
    <React.Fragment>
      <div className="board">

        {num_squares.map((n, index) => {
          const id: number = index + 1;

          return (<GameSquare
            id={id}
            place={place}
            stationarray={stationarray}
            key={id}
          />)
        })}

        {questionseen ? <Popup toggle={togglePop} setter={setter} setquestionseen={closequestionseen} owner={owner} question={question} player={player} place={place} buttonshow={buttonshow} rentshow={rentshow} setarray={setarray} stationarray={stationarray} /> : null}
        {start ? <StartPopUp toggle={toggleStartPop} /> : null}
        {endgame ? <ResultPopUp toggle={resulttoggle} score={score} saving={money} /> : null}
        <div className="center-square square">
          <div className="center-txt ">
            <div className="MessageBox">
              MessageBox
              <h3>
              {message}
              </h3>
              
            </div>
            <div className="MessageContainer">
              <div className="Score">
                Player1
                <br />
                Score
                <br />
                {score1}
              </div>

              <div className="Score">
                Player 2
                <br />
                Score
                <br />
                {score2}
              </div>
              <div className="Score">
                Player 3
                <br />
                Score
                <br />
                {score3}
              </div>
              <div className="Score">
                Player 4
                <br />
                Score
                <br />
                {score4}
              </div>
            </div>
            <div className="MessageContainer">
              <div className="Score">
                Player1
                <br />
                Saving
                <br />
                {saving1}
              </div>

              <div className="Score">
                Player 2
                <br />
                Saving
                <br />
                {saving2}
              </div>
              <div className="Score">
                Player 3
                <br />
                Saving
                <br />
                {saving3}
              </div>
              <div className="Score">
                Player 4
                <br />
                Saving
                <br />
                {saving4}
              </div>
            </div>
            <br />
            <div>
              <button className="button" onClick={rolldice}>
                rolldice
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

