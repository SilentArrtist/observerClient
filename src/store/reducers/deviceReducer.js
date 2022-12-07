const SET_DEVICES = "SET_DEVICES"
const defaultState = {
    devices:[],
}
export const deviceReducer = (state=defaultState,action)=>{
    switch(action.type){
        case SET_DEVICES:
            return {...state,devices:action.payload}
        default:
            return state
    }
}
export const setDeivcesAction = (payload) => ({type:SET_DEVICES, payload})