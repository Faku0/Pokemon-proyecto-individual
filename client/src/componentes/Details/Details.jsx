import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetalle } from "../../actions";
import { useEffect } from "react";
import './DetailsCss.css'

export default function Detalle(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetalle(props.match.params.id)); 
    }, [dispatch])

    
    const myDetail = useSelector((state) => state.detalle)
    console.log(myDetail)

    return(
        <div>
            {        
                myDetail.length>0 ? myDetail.map( a =>
                <div>
                    <img alt="" width="200" height="200" src= {a.img}/>
                    <h2> Id: {a.id}</h2>
                    <h2> Nombre: {a.name}</h2>
                    <h2> Vida: {a.vida}</h2>
                    <h2> Ataque: {a.ataque}</h2>
                    <h2> Defensa: {a.defensa}</h2>
                    <h2> Velocidad: {a.velocidad}</h2>
                    <h2> Altura: {a.altura}</h2>
                    <h2> Peso: {a.peso}</h2>
                    <h2 className="tipo"> Tipos: {a.tipos[0]} {a.tipos[1]} </h2>
                </div> ): <p>Cargando...</p>
            }
            <Link to='/home'> 
            <button>
                    Volver al Inicio
            </button>
            </Link>
        </div>
    )
}

