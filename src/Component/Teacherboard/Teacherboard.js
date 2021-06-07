import React,{Component} from 'react';
import Addquestion from "../Addquestion/Addquestion";
import Liststudent from "../Liststudent/Liststudent";
import QuestionInfo from "../QuestionInfo/QuestionInfo";

export default class Preferences extends Component {

  state={
    addquestionshow:false,
    viewstudentshow:false,
    questionshow:false
  }
  toggleaddquestion = () => {
    this.setState({
      addquestionshow: true,
      viewstudentshow:false,
      questionshow:false
    });
  };
  toggleview = () => {
    this.setState({
      addquestionshow: false,
      viewstudentshow:true,
      questionshow:false
    })
  };
  togglequestionview = () => {
    this.setState({
      addquestionshow: false,
      viewstudentshow:false,
      questionshow:true
    })
  };

  render(){
    return(
      <div className="questionform">
        <h2>Teacher Page</h2>
        <button onClick={this.toggleaddquestion}>Add Question</button>
        <button onClick={this.toggleview}>View Student Score</button>
        <button onClick={this.togglequestionview}>View Question</button>
        {this.state.addquestionshow?<Addquestion/>:null}
        {this.state.viewstudentshow?<Liststudent/>:null}
        {this.state.questionshow?<QuestionInfo/>:null}
      </div>
    );
  }
}