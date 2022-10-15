import React, { useState, useEffect }  from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, ordenName, filtCreados, filtAtaque, filtTipo } from "../../actions";
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./HomeCss.css"

export default function Home (){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
    console.log(allPokemons);
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);
    console.log(currentPokemons);

    const pagina = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getPokemons());
    }, [dispatch])
    
    function handleClick(a) {
        a.preventDefault();
        dispatch(getPokemons());
    }

    function handleFiltTipo(e) {
        dispatch(filtTipo(e.target.value));
      }

    function handleOrdenName(s) {
        s.preventDefault();
        dispatch(ordenName(s.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${s.target.value}`)
    }

    function handleFiltAtaque(e) {
        dispatch(filtAtaque(e.target.value));
      }

    function handleFiltCreados(c){
        c.preventDefault();
        dispatch(filtCreados(c.target.value))
    }
  


    return(
        <div id="fondo">
            <div>
                <div className="Nav">
            <NavBar/>      
                </div> 
         <button className="recarga" onClick={a =>{handleClick(a)}}>
            Recargar Pokemons
         </button>
            <select className="select" onChange={s => handleOrdenName(s)}>
                <option value="Filt">Por nombre:</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            <select className="select" onChange={e => handleFiltAtaque(e)}>
                <option value="Ataque">Por ataque:</option>
                <option value="Mayor Ataque">Mayor ataque</option>
                <option value="Menor Ataque">Menor ataque</option>
            </select>
            <select className="select" onChange={t => handleFiltTipo(t)}>
                <option value="All">Por tipo:</option>
                <option value="normal">Normal</option>
                <option value="fighting">Lucha</option>
                <option value="flying">Volador</option>
                <option value="poison">Veneno</option>
                <option value="ground">Tierra</option>
                <option value="rock">Roca</option>
                <option value="bug">Bicho</option>
                <option value="ghost">Fantasma</option>
                <option value="steel">Acero</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="grass">Planta</option>
                <option value="electric">Electrico</option>
                <option value="psychic">Psiquico</option>
                <option value="ice">Hielo</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Siniestro</option>
                <option value="fairy">Hada</option>
                <option value="unknown">Desconocido</option>
                <option value="shadow">Oscuro</option>
            </select>
            <select className="select" onChange={c => handleFiltCreados(c)}>
                <option value="all">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
            <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} pagina={pagina}/>
            </div>

            <div className="cards"> 
            { currentPokemons.length >= 1 ? currentPokemons.map(inf =>{
                console.log(inf)
                return(
                    <fragment> 
                        <Link to={'/detalle/' + inf.id}>
                          <Card name={inf.name} img={inf.img ? inf.img : inf.image} tipos={inf.tipos} ataque={inf.ataque} vida={inf.vida} key={inf.id}/>
                        </Link>
                    </fragment>
                )
            })  :  <div className="Carga">                    
                    <img className="fotoCarga" alt="" src="https://i.gifer.com/embedded/download/7A9W.gif"/>
                    <p className="cargando"> Cargando...</p>
                   </div>
         }
         </div>
         <div>
            <Footer/>
         </div>
        </div>
    )
}