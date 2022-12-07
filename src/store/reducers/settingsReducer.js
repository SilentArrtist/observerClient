const SET_SETTINGS = "SET_SETTINGS"
const SET_POLLING_SETTINGS = "SET_POLLING_SETTINGS"
const defaultState = {
    settings:[],
    pollingSettings:[],
}
export const settingsReducer = (state=defaultState,action)=>{
    switch(action.type){
        case SET_SETTINGS:
            return {...state,settings:action.payload}
        case SET_POLLING_SETTINGS:
            return {...state,pollingSettings:action.payload}
        default:
            return state
    }
}
export const setSettignsAction = (payload) => ({type:SET_SETTINGS, payload})
export const setPollingSettingsAction = (payload) => ({type:SET_POLLING_SETTINGS, payload})