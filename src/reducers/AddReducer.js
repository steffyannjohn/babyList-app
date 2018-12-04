
//   ​Reducer corresponding to AddAction.js
export default (state = [], action) => {
    switch (action.type) {
        case "ADD_NAME":
            return {
                ...state,
                name: action.name,
                list_id: action.list_id
            };
        default:
            return {
                ...state
            };
    }
}