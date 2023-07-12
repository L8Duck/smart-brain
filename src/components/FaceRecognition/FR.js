import React from 'react';
import './FR.css';

const FaceRecognition = ({imageURL}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 shadow-2 br4'>
                <img src={imageURL} alt='loading' width={'auto'} height={'300px'}></img>
            </div> 
        </div>
    );
}

export default FaceRecognition;