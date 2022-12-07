import { Rnd } from "react-rnd";
import {useEffect} from 'react';
import {useSelector } from 'react-redux';
import CustomBlock from './CustomBlock';
import '../../styles/Element.css'
import { useState } from 'react';

const Element = (({openPopUp,element}) => {
    const [states,setStates] = useState({
        width: element.width,
        height: element.height,
        x: element.x,
        y: element.y
    })
    const [output,setOutput] = useState('');
    const devices = useSelector(state=>state.devices.devices)
        useEffect(() => {
        if(!element.isOutputChange&&!element.output.includes('%s')){setOutput(element.output);return;}
        if(devices.length===0){
            setOutput(element.output.replace('%s','noDev'));
            return;
        }
        else{            
           if(devices&&devices[0]&&element.type&&(devices[0][element.type].length!==0)&&element.index){
                setOutput(element.output.replace('%s',devices[0][element.type][element.index]));
            }
            else{
                setOutput(element.output.replace('%s','ND'));
            }
            return;
        }
        
    },[element.isOutputChange, element.output, element.type, element.index, devices])
    return (
        <Rnd
        size={{ width: states.width, height: states.height }}
        position={{ x: states.x, y: states.y }}
        onDragStop={(e, d) => {
            element.x = d.x;
            element.y = d.y;
            setStates({ 
            width: states.width,
            height: states.height,
            x: d.x,
            y: d.y,
            });

        }}
        onResizeStop={(e, direction, ref, delta, position) => {
            element.x = position.x;
            element.y = position.y;
            element.width = ref.style.width;
            element.height = ref.style.height;
            setStates({
                width: ref.style.width,
                height: ref.style.height,
                ...position
            });
        }}
        >
            <CustomBlock openPopUp={openPopUp} element = {element}>
                <div>  
                    {output}
                </div>
            </CustomBlock>
        </Rnd>
    );
});
export default Element;