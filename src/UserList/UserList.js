import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
// import { addBabyName } from './../actions/AddAction';
import './../App.css';

class List extends React.Component {
    babyList = JSON.parse(localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : [];
    newArr = JSON.parse(localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : [];
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#*&';
    flag = false;
    class = '';
    state = {
        reload: false
    };
    
    Submit = (event) => {
        event.preventDefault();
        let babyName = document.getElementById('names').value;
        // ***For text validation ***//
        let babyNameRegEx = /^[a-zA-Z\s{1,''}]*$/;
        if(babyName.match(babyNameRegEx)){
        let List = {
            name: babyName.trim(),
            list_id: this.listIdGenerator(this.chars),
            flag:false
        };
        this.newArr.push(List);
        var valueArr = this.newArr.map(function (item) { return item.name });
        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item) !== idx
        });
        if (isDuplicate === true) {
            toast.error("Name already exists", { position: toast.POSITION.TOP_RIGHT });
            this.newArr = Array.from(new Set(this.babyList));
            valueArr = Array.from(new Set(valueArr));
        }
        else {
            this.babyList.push(List);
        };
        localStorage.setItem('name', JSON.stringify(this.babyList));
        this.setState({
            reload: false
        });
    }
    else{
        toast.error("Name must be in text", { position: toast.POSITION.TOP_RIGHT });
    }
        document.getElementById('names').value = '';
        isDuplicate = false;
        // console.log("isDuplicate", isDuplicate);
        // console.log("babyList", this.babyList);
        // console.log("newArr", this.newArr);
       
    };
    // ** list Id Generation via Javascript code***//
    listIdGenerator = (chars) => {
        let id = '';
        for (let i = 0; i<12; i++) {
            id = id +  chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return id;
    };
    // ***sort logic based on name****//
     sortName = () => {
        this.flag = this.flag === false?(this.babyList.sort(this.ascendingSort), this.flag = true): (this.babyList.sort(this.descendingSort),
            this.flag = false)
         this.setState({
            reload: false
        });
     };
     ascendingSort = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
         let comparison = 0;
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison;
      };
      descendingSort = (a,b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
         let comparison = 0;
        if (nameB > nameA) {
          comparison = 1;
        } else if (nameB < nameA) {
          comparison = -1;
        };
        
        return comparison;
      };
      Change = (e) => {
        console.log("_iddd",e.target.id);
        // let id = e.target.id;
        let element = e.target;
        element.nextSibling.classList.toggle('strikeOut');
        console.log("_list_id",element.id);
        console.log("name",element.name);
        for (let i in this.babyList) {
            if (this.babyList[i].list_id === element.id) {
                if(this.babyList[i].flag === true){
                    this.babyList[i].flag = false
                }
                else{
                    this.babyList[i].flag = true
                }
               break; 
            }
          }
          console.log("flagValue",this.babyList)
         };
        
     render() {
        if (!this.state.reload) {
            return (
                <div>
                    <ToastContainer />
                    <form className="form" onSubmit={this.Submit}>
                        <div>
                            <label className="label">Names:</label>
                            <input type="text" id="names" required />
                        </div><br />

                        <div>
                            <button className="button" type="submit">Add</button>
                        </div>
                    </form>
                    <div>
                        <br />
                        <br />
                        <button className="button" type="submit" onClick={(e)=>{this.sortName()}}>Sort</button>
                        {/* {
                            this.babyList.length > 0 && <p>List:</p> &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>SL No</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                {
                                    this.babyList.map((name, _index) => {
                                        return (
                                            <tbody key={_index}>
                                                <tr>
                                                    <td>{_index + 1}</td>
                                                    <td>{name.name}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>
                        } */}

                         {
                                    this.babyList.map((name, _index) => {
                                        return (
                                            <div key = {_index}>
                                                <input type="checkbox" id={name.list_id}  name={name.name} value = {name.name} onChange = {(e)=>{this.Change(e)}}/>
                                                <span  >{name.name}</span>
                                               
                                            </div>
                                           
                                        )
                                    })
                                }
                    </div>

                </div>

            )
        }
        else {
            return (<div></div>)
        }
    }
};

export default List

// function matchDispatchToProps(dispatch) {
//     return bindActionCreators({
//         addBabyName
//     }, dispatch);
// };

// function mapStateToProps(state) {
//     return {
//         ...state
//     }
// };
// export default connect(mapStateToProps, matchDispatchToProps)(List);



