import React,{Component} from 'react';
import Addquestion from "../Addquestion/Addquestion";
import Liststudent from "../Liststudent/Liststudent";

export default class Preferences extends Component {

  state={
    addquestionshow:false,
    viewstudentshow:false
  }
  toggleaddquestion = () => {
    this.setState({
      addquestionshow: true,
      viewstudentshow:false
    });
  };
  toggleview = () => {
    this.setState({
      addquestionshow: false,
      viewstudentshow:true
    })
  };

  render(){
    return(
      <div className="questionform">
        <h2>Teacher Page</h2>
        <button onClick={this.toggleaddquestion}>Add Question</button>
        <button onClick={this.toggleview}>View Student Score</button>
        {this.state.addquestionshow?<Addquestion/>:null}
        {this.state.viewstudentshow?<Liststudent/>:null}
      </div>
    );
  }
}