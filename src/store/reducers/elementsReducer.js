const ADD_ELEMENT = "ADD_ELEMENT"
const SET_ELEMETNS = "SET_ELEMETNS"
const SET_IMAGES = "SET_IMAGES"
const SET_IMAGES_NAMES = "SET_IMAGES_NAMES"
const CHANGE_STYLE = "CHANGE_STYLE"
const CHANGE_IMAGE_STYLE = "CHANGE_IMAGE_STYLE"
const CHANGE_DYNAMIC_VALUE = "CHANGE_DYNAMIC_VALUE"
const CHANGE_OUTPUT = "CHANGE_OUTPUT"
const CHANGE_OUTPUT_STATUS = "CHANGE_OUTPUT_STATUS"
const CHANGE_SELECTED_ELEMENT = "CHANGE_SELECTED_ELEMENT"
const CONNECT = "CONNECT"
const DELETE_ELEMENT = "DELETE_ELEMENT"
const ADD_IMAGE = "ADD_ICON"
const DELETE_IMAGE = "DELETE_ICON"
const defaultState = {
    elements:[],
    images:[],
    imagesNames:[],
    selectedElement:{
        key:1,
        x:1,
        y:1,
        type:null,
        index:null,
        output:"temp",
        isOutputChange:false,
        style:{
            color:"#000000",
            background:"",
            border:"none",
            fontWeight:"400",
            fontSize:"15",
            fontStyle:"normal",
            width:120,
            height:100,
            borderRadius:"0%",
            zIndex:"2",
            },
        dynamicValue:{
            backgroundValue:"none",
            background:"#ffffff",
            colorValue:"none",
            color:"#ffffff",
            borderColorValue:"none",
            borderColor:"#ffffff",
        }
    }
}
export const elementsReducer = (state=defaultState,action)=>{
    switch(action.type){
        case ADD_ELEMENT:
            return {...state,elements:[...state.elements,action.payload]}
        case SET_ELEMETNS:
            return {...state,elements:action.payload}
        case SET_IMAGES:
            return {...state,images:action.payload}
        case SET_IMAGES_NAMES:
            return {...state,imagesNames:action.payload}
        case DELETE_ELEMENT:
            const elsArr = state.elements.filter(el=>el.key!==action.payload)
            return {...state,elements:[...elsArr]}
        case CHANGE_OUTPUT:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.output = action.payload.output;
                }
            })
            return state
        case CHANGE_STYLE:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.style[action.payload.parameter] = action.payload.newValue;
                }
            })
            return state
        case CHANGE_IMAGE_STYLE:
            state.images.forEach(el=>{
                if(el.key === action.payload.key){
                    el.style[action.payload.parameter] = action.payload.newValue;
                }
            })
            return state
        case CHANGE_DYNAMIC_VALUE:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.dynamicValue[action.payload.parameter] = action.payload.newValue;
                }
            })
            return state
        case CHANGE_SELECTED_ELEMENT:
            return {...state,selectedElement:action.payload}
        case CONNECT:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.type = action.payload.type;
                    el.index = action.payload.index;
                }
            })
            return state;
        case CHANGE_OUTPUT_STATUS:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.isOutputChange = action.payload.newStatus;
                }
            })
            return state;
        case ADD_IMAGE:
            return {...state,images:[...state.images,action.payload]}
        case DELETE_IMAGE:
            const imgArr = state.images.filter(el=>el.key!==action.payload)
            return {...state,images:[...imgArr]}
        default:
            return state
    }
}
export const addElementAction = (payload) => ({type:ADD_ELEMENT, payload})
export const setElementsAction = (payload) => ({type:SET_ELEMETNS, payload})
export const setImagesAction = (payload) => ({type:SET_IMAGES, payload})
export const setImagesNamesAction = (payload) => ({type:SET_IMAGES_NAMES, payload})
export const deleteElementAction = (payload) => ({type:DELETE_ELEMENT, payload})
export const changeStyleAction = (payload) => ({type:CHANGE_STYLE, payload})
export const changeImageStyleAction = (payload) => ({type:CHANGE_IMAGE_STYLE, payload})
export const changeDynamicValueAction = (payload) => ({type:CHANGE_DYNAMIC_VALUE, payload})
export const changeSelectedElement = (payload) => ({type:CHANGE_SELECTED_ELEMENT, payload})
export const connectAction = (payload) => ({type:CONNECT, payload})
export const changeOutputAction = (payload) => ({type:CHANGE_OUTPUT, payload})
export const changeOutputStatusAction = (payload) => ({type:CHANGE_OUTPUT_STATUS, payload})
export const addImageAction = (payload) => ({type:ADD_IMAGE, payload})
export const deleteImageAction = (payload) => ({type:DELETE_IMAGE, payload})