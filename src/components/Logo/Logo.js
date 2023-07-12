import React from 'react';
import { Tilt } from 'react-tilt';
import meta from './meta.png';
import './Logo.css';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Logo = () => {
    return (
            <Tilt options={defaultOptions} style={{ height: 150, width: 150 }}>
                <div className='Tilt-inner br4 pa2 shadow-3 ma3'><img src={meta} alt='brain'></img></div>
            </Tilt>
    );
}

export default Logo;