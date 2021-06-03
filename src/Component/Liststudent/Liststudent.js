import React,{Component} from 'react';
import axios from 'axios';

export default class Liststudent extends Component {
    state={
        data:[]
    }
    componentDidMount(){
        let data = axios.get("http://localhost:4000/getallstudent").then(
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
              <td>{item["student_name"]}</td>
              <td>{item["saving"]}</td>
              <td>{item["score"]}</td>
              <td>{item["progress"]}</td>
            </tr>
        )
        console.log(student_data)
        list=<tbody>{student_data}</tbody>
      }

    return(
      <div>
        <table>
            <thead>
                <th>student Name</th>
                <th>Saving</th>
                <th>Score</th>
                <th>progress</th>
            </thead>
            {list}
        </table>
      </div>
    );
  }
}