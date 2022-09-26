import React from "react";
import './CardCss.css'

export default function Card({ name, img, tipos, ataque, vida }) {
    return(
        <div className="CardStyle">
            <h3 className="name">{name}</h3>
            <img src= {img} alt='img pokemon' width='180px' height='180px'/>
            <h5> Ataque: {ataque}</h5>
            <h6> Vida: {vida}</h6>
            <div className="tipo">{tipos[0]} {tipos[1]} </div>          
        </div>
    )
}