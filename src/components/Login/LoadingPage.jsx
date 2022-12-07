import React from 'react';
import '../../styles/LoadingPage.css'
const LoadingPage = ({logIn}) => {
    return (
        <div className="loadingWrapper">
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>
    );
};

export default LoadingPage;