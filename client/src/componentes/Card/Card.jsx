import React from "react";
import './CardCss.css'

export default function Card({ name, img, tipos, ataque }) {
    return(
        <div className="CardStyle">
            <h3 className="name">{name}</h3>
            <img src= {img} alt='img pokemon' width='180px' height='180px'/>
            <h5 className="ataque"> Ataque: {ataque}</h5>
            <header className="tipo">
                <ul className="tip">
                    <li><a className="tipos">{tipos[0]}</a></li>
                    <li><a className="tipos">{tipos[1]}</a></li>
                </ul>
            </header>          
        </div>
    )
}