import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName } from '../../actions/index'
import './NavBarCss.css'

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
            <input type= 'text' placeholder="Buscar pokemon..." onChange={(p) => handleInputChange(p)}/>
            <button type='submit' onClick={(p) => handleSubmit(p)}>Buscar</button>
        </div>
    )
}
