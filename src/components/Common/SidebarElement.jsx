import React, { memo } from 'react';

const SidebarElement = ({src,alt,title,callback,argums}) => {
    return (
        <div 
        onClick={(e)=>callback(e,argums)}
        >
            <span className='icon'>
                <img src={src} alt={alt} title={title}/>
            </span>
        </div>
    );
};

export default memo(SidebarElement);