import React, { memo } from 'react';
import '../../styles/Register.css'
const InputRegisters = memo(({value,number}) => {
    return (
        <div>
            <div className="registerBox">
                <p>Input Register №{number}:{value}</p>
            </div>
        </div>
    );
});

export default InputRegisters;