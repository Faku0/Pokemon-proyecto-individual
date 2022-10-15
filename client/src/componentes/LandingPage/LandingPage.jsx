import React from "react";
import {Link} from 'react-router-dom';
import './LandingPageCss.css'

export default function LandingPage(){
    return(
        <div className="Page">
            <div className="divisor1" id="texto">
            <h1>Hola Maestro Pokémon!!</h1>
            <h2>¿Listo para comenzar tu aventura?</h2>
            <Link to ='/home'>
               <button className="Boton">Click Aquí para ver tus pokemons</button>
            </Link>
            </div>

            <div className="divisor2">
            <img className="pika" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"/>
            </div>
        </div>
    )
}