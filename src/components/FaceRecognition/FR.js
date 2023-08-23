import React from 'react';
import './FR.css';

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 shadow-2 br4'>
                <img id='inputimage' src={imageURL} alt='loading' width={'auto'} height={'300px'}></img>
                <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div> 
        </div>
    );
}

export default FaceRecognition;