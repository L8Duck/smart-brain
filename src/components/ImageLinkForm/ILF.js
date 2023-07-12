import React from 'react';
import './ILF.css';

const ImageLinkForm = () => {
    return(
        <div>
            <p className='f3'>
                {'This Magic brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' placeholder='URL'></input>
                    <button className='w-30 grow f3 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    ); 
}

export default ImageLinkForm;