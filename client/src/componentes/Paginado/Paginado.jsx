import React from "react";
import './PaginadoCss.css'

export default function Pagina ({pokemonsPerPage, allPokemons, pagina} ) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='pagina'>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className='numeros' key={number} >
                        <button className="boton" onClick={() => pagina(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}