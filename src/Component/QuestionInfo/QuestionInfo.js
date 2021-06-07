import React,{Component} from 'react';
import axios from 'axios';

export default class QuestionInfo extends Component {
    state={
        data:[]
    }
    componentDidMount(){
        let data = axios.get("http://localhost:4000/getallquestion").then(
            res=>res.data
        )
        data.then(data=>{
            console.log(data)
            this.setState({data:data})
            }
        )
    }
  render(){
      let list=<tbody></tbody>
      if (this.state.data.length>0){
        let student_data = this.state.data.map((item,i)=>
            <tr key={i}>
              <td>{item["question"]}</td>
              <td>{item["answers"]}</td>
              <td>{item["difficulty"]}</td>
              <td>{item["teacher_id"]}</td>
              <td>{parseInt(item["correct"]/(item["correct"]+item["incorrect"])*100)}%</td>
              {/* <td>{item["incorrect"]}</td> */}
            </tr>
        )
        console.log(student_data)
        list=<tbody>{student_data}</tbody>
      }

    return(
      <div>
        <table>
            <thead>
                <th>Question</th>
                <th>Answers</th>
                <th>Difficulty</th>
                <th>Teacher_id</th>
                <th>Correct percentage</th>
            </thead>
            {list}
        </table>
      </div>
    );
  }
}