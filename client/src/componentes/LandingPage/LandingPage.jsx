import React from "react";
import {Link} from 'react-router-dom';
import './LandingPageCss.css'

export default function LandingPage(){
    return(
        <div className="Page">
            <h1>Hola Maestro Pokemom</h1>
            <Link to ='/home'>
               <button>Ver tus pokemons</button>
            </Link>
        </div>
    )
}