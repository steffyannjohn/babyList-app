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
            list_id: this.listIdGenerator(this.chars)
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
       };
    // ** list Id Generation via Javascript code***//
    listIdGenerator = (chars) => {
        let id = '';
        for (let i = 0; i<12; i++) {
            id = id +  chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return id;
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
                        {
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

export default List;



