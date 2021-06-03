import React,{Component} from 'react';
import axios from 'axios';

export default class Addquestion extends Component {

  state={
      Question:"",
      Answer:"",
      Difficulty:"",
      ID_t:""
  }
  handleSubmit=()=>{
      let data = axios.post("http://localhost:4000/newquestion",{
          question:this.state.Question,
          answer:this.state.Answer,
          diff:this.state.Difficulty,
          ID_t:this.state.ID_t
        })
        .then(result=>
            result.data
      )
      data.then((data)=>{
        if (data.affectedRows > 0){
            alert("Success")
        }
        else{
            alert("Fail to insert question")
        }
      }).catch(error=>{
        alert("Fail to insert question")
      }).finally(
          this.setState({
              question:"",
              answer:"",
              diff:"",
              ID_t:""
            })
      )
  }

  render(){
    return(
      <div className="questionform">
        <label>
            <p><h2>Qestion</h2></p>
            <input type="text" value={this.state.question} onChange={event => this.setState({Question:event.target.value})}/>
        </label>
        <label>
            <p><h2>Answer</h2></p>
            <input type="text" value={this.state.answer} onChange={event => this.setState({Answer:event.target.value})}/>
        </label>
        <label>
            <p><h2>Difficulty</h2></p>
            <input type="text" value={this.state.diff} onChange={event => this.setState({Difficulty:event.target.value})}/>
        </label>
        <label>
            <p><h2>Teacher ID</h2></p>
            <input type="text" value={this.state.ID_t} onChange={event => this.setState({ID_t:event.target.value})}/>
        </label>
        <div>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}