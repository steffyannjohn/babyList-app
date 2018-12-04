import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
// import { addBabyName } from './../actions/AddAction';
import './../App.css';

const grid = 8;
  
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
  });

    class List extends React.Component {

    babyList = JSON.parse(localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : [];
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#*&';
    flag = false;
    class = '';
    state = {
        reload: false,
        items:[]
    };
    constructor(props) {
        super(props);
        this.state = {
          items: this.babyList,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
      };
     reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return this.babyList = result;
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
        var valueArr = this.babyList.map(function (item) { return item.name });
      
        var isDuplicate = valueArr.includes(babyName);
        if (isDuplicate === true) {
            toast.error("Name already exists", { position: toast.POSITION.TOP_RIGHT });
           
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
         
        
          onDragEnd(result) {
            // dropped outside the list
            if (!result.destination) {
              return;
            }
        
            const items = this.reorder(
              this.state.items,
              result.source.index,
              result.destination.index
            );
        
            this.setState({
              items,
            });
          }   
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
                      {this.babyList.length>0 &&  <button className="button" type="submit" onClick={(e)=>{this.sortName()}}>Sort</button>}
                        
                     {this.babyList.length>0  && <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.babyList.map((item, index) => (
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
                    <input type="checkbox" id={item.list_id}  name={item.name} value = {item.name} onChange = {(e)=>{this.Change(e)}}/>
                                                <span  >{item.name}</span>
                      {/* {item.name} */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>}
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



