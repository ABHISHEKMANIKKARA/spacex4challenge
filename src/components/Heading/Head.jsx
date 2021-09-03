import React from 'react'
import './head.css'
import logo  from '../../resource/logo.png'

function Head() {
    return (
        <div className="heading">
            <img src={logo} className="logo" /> 
        </div>
    )
}

export default Head;
