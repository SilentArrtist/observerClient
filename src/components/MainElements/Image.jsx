import { useState } from "react";
import { useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import { deleteImageAction } from "../../store/reducers/elementsReducer";
import '../../styles/Image.css'
const Image = ({imgElem}) => {
  const dispatch = useDispatch();
  const [states,setStates] = useState({
      width: imgElem.width,
      height: imgElem.height,
      x: imgElem.x,
      y: imgElem.y
  })
  const deleteElem = async(e) =>{
    e.preventDefault();
    dispatch(deleteImageAction(imgElem.key))
  }
return (
    <Rnd
    size={{ width: states.width, height: states.height }}
    position={{ x: states.x, y: states.y }}
    onDragStop={(e, d) => {
        imgElem.x = d.x;
        imgElem.y = d.y;
        setStates({ 
          width: states.width,
          height: states.height,
          x: d.x,
          y: d.y,
        });

    }}
    onResizeStop={(e, direction, ref, delta, position) => {
        imgElem.x = position.x;
        imgElem.y = position.y;
        imgElem.width = ref.style.width;
        imgElem.height = ref.style.height;
        setStates({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
    }}
    >
        <img
        onContextMenu = {(e)=>deleteElem(e)} 
        className='resizableImg'
        draggable='false'
        src={`${window.location.href.replace("3000","4000")}images/${imgElem.src}`}
        alt="ImageWithoutSrc"
        />
    </Rnd>
    );
};
export default Image;