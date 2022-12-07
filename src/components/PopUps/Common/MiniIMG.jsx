import React from 'react';

const MiniIMG = ({imgSrc,addImg,deleteImg}) => {
    return (
        <div className='miniIMGBlock'>
            <p className='deleteImg' onClick={()=>deleteImg(imgSrc)}>X</p>
            <img onClick={()=>addImg(imgSrc)} src={`${window.location.href.replace("3000","4000")}images/${imgSrc}`}/>
        </div>
    );
};

export default MiniIMG;