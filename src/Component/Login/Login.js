import React ,{useState}from 'react';
import "./Login.css";
import PropTypes from 'prop-types';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBIcon} from 'mdbreact';

function loginUser(name,pass) {
    return axios.post('http://localhost:4000/login', {
      username:name,
      password:pass
    })
      .then(res => res.data)
   }

export default function Login({ setToken }) {

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(
          username,
          password
        ).then(data => {
          console.log(data)
          if(data.length>0){
            if (username.charAt(0)=="2"){
              console.log("hi")
              setToken("student")
            }
            else{
              setToken("teacher")
            }
          }
          else{
            alert("Incorrect Password or username")
          }
        })
      }


  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return(
    <div className="wrapper">
      <br/>
      <br/>
    <MDBIcon icon="dice-d6" size="4x" className="tokenicon" /><h1>Monopoly Education</h1>

    <form onSubmit={handleSubmit}>
    <h1>Please Log In</h1>
      <label>
        <p>Username(ID)</p>
        <input type="text" onChange={event => setUserName(event.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={event => setPassword(event.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }