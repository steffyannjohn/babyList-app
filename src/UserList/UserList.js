import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBabyName } from './../actions/AddAction';
import 'react-toastify/dist/ReactToastify.css';
import './../App.css';

const grid = 8;
  
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles for drag and drop
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
  });

  class List extends React.Component {
  //  babyList = JSON.parse(localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : [];
   babyList = []
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#*&';
    flag = false;
    strLength = 12;
    babyNameArr = [];
      constructor(props) {
        super(props);
        this.state = {
          items: this.babyNameArr?this.babyNameArr:[],
          reload: false
        };
         this.onDragEnd = this.onDragEnd.bind(this);
      };
     reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return this.babyNameArr = result;
      };
    Submit = (event) => {
        event.preventDefault();
        let babyName = document.getElementById('names').value;
        // ***For text validation ***//
        let babyNameRegEx = /^[a-zA-Z\s{1,''}]*$/;
        if(babyName.match(babyNameRegEx)){
          // console.log("whitespace", babyName.replace(/\s+$/, '').trim())
        let listObj = {
            name: babyName.trim(),
            list_id: this.listIdGenerator(this.chars,this.strLength),
            flag:false
        };
        var valueArr = this.babyList.map(function (item) { return item.name });
        var isDuplicate = valueArr.includes(babyName);
        if (isDuplicate === true) {
            toast.error("Name already exists", { position: toast.POSITION.TOP_RIGHT });
            }
        else {
            this.babyList.push(listObj);
        };
        // localStorage.setItem('name', JSON.stringify(this.babyList));
        this.babyNameArr =this.props.addBabyName(this.babyList).data;
        this.setState({
            reload: false
        });
    }
    else{
        toast.error("Name must be in text", { position: toast.POSITION.TOP_RIGHT });
    };
        document.getElementById('names').value = '';
        isDuplicate = false;
         };
    // ** list Id Generation via Javascript code***//
    listIdGenerator = (chars,length) => {
        let id = '';
        for (let i = 0; i<length; i++) {
            id = id +  chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return id;
    };
    // ***sort logic based on name****//
     sortName = () => {
        let toggleSort = this.babyNameArr.sort(this.sortToggle);
        this.flag = this.flag === false?(toggleSort, this.flag = true): (toggleSort,
            this.flag = false);
         this.setState({
            reload: false
        });
     };
    //  Edit flag for maintaining check vs uncheck across session
      onToggleCheck = (e) => {
        let element = e.target;
        element.nextSibling.classList.toggle('strikeOut');
           for (let i in this.babyNameArr) {
           if (this.babyNameArr[i].list_id === element.id) {
              this.babyNameArr[i].flag =this.babyNameArr[i].flag === true ?false:true
              } };
          this.setState({
            reload: false
        });
         };
         onDragEnd(result) {
            // dropped outside the list
            if (!result.destination) {
              return;
            }
            const items = this.reorder(
              this.babyNameArr,
              result.source.index,
              result.destination.index
            );
            this.setState({
              items,
            });
          };
        sortToggle = (a,b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if(this.flag === false){
              return   (nameA>nameB ?1:(nameA<nameB?-1:0))
            }
             return    (nameB>nameA ?1:(nameB<nameA?-1:0))
             }
     render() {
        if (!this.state.reload) {
            return (
                <div>
                    <ToastContainer />
                    <br/>
                    <div className="form">
                    <form className="pure-form"onSubmit={this.Submit}>
                     <input type="text" className="pure-input-rounded" placeholder="Enter baby Name"id="names" required/>
                    <button type="submit" className="pure-button">Add</button>
                    </form></div>
                    <div>
                        <br />
                        <br />
                      {this.babyNameArr.length>0 && <button className="button" type="submit" onClick={(e)=>{this.sortName()}}>Sort</button>}
                      <br/>
                      {this.babyNameArr.length>0 &&
                      <div className="centered">
                      <div  >
        <DragDropContext   onDragEnd={this.onDragEnd}>
        <Droppable  droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.babyNameArr.length>0 && this.babyNameArr.map((item, index) => (
                <Draggable key={item.list_id} draggableId={item.list_id} index={index}>
                  {(provided, snapshot) => (
                    <div

                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                    <input type="checkbox" id={item.list_id}  name={item.name} value = {item.name} onChange = {(e)=>{this.onToggleCheck(e)}}
                     checked = {item.flag === true ?true:false}
                     />
                     <span className= {item.flag===true?'strikeOut':''}>{item.name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      </div>}
                    </div>
            </div>
         )
        }
        else {
            return (<div></div>)
        }
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addBabyName
    }, dispatch);
};

function mapStateToProps(state) {
    return {
        ...state
    }
};
export default connect(mapStateToProps, matchDispatchToProps)(List);
