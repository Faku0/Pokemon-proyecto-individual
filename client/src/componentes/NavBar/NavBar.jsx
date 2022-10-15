import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName } from '../../actions/index';
import {Link} from 'react-router-dom';
import './NavBarCss.css';

export default function NavBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(p){
        p.preventDefault()
        setName(p.target.value)
    }

    function handleSubmit(p){
        p.preventDefault()
        dispatch(getPokemonsName(name))
        console.log(name)
    }

    return(
        <div>
            <header className="header">
            <div>
            <Link to='/' className="titulo"><img className="titulo" src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d98dde45d242734.png"/></Link>
            </div>
            <ul className="busc">
                <li> <input className="buscador" type= 'text' placeholder="Busca tu pokemon..." onChange={(p) => handleInputChange(p)}/></li>
                <li> <button className="buscar" type='submit' onClick={(p) => handleSubmit(p)}>Buscar</button></li>
            </ul>
            <button className="crear">
                <Link to= '/crear' className="textocrear">Crea tu pokemon</Link>
            </button>
            </header>
        </div>
    )
}
