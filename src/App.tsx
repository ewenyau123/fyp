import React ,{useState} from "react";

import GameBoard from "./client/GameBoard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Teacherboard from "./Component/Teacherboard/Teacherboard";
import Login from './Component/Login/Login';

function App() {
  const [token, setToken] = useState<any>();
  if(!token) {
    return <Login setToken={setToken} />
  }
  else if (token =="student"){
    return (
      <React.Fragment>
        <CssBaseline />
        <GameBoard />
      </React.Fragment>
    );
  }
  else{
    return <Teacherboard/>
  }
  
}

export default App;
