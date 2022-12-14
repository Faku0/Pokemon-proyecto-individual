import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { createPokemon, getTipos } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreateCss.css'

function validacion(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Ponele un nombre pobre";
    } else if (!/^[a-zA-Z ]+$/.test(input.name)) {
      errors.name = "Letters only";
    }
    if (input.vida <= 0) {
      errors.vida = "Que no esté muerto!!!";
    }
    if (input.ataque <= 0) {
      errors.ataque = "Le falta sopa";
    }
    if (input.defensa <= 0) {
      errors.defensa = "Que se defienda";
    }
    if (input.velocidad <= 0) {
      errors.velocidad = "Es un objeto inamovible!!!";
    }
    if (input.altura <= 0) {
      errors.altura = "Estiralo!!";
    }
    if (input.peso <= 0) {
      errors.peso = "Dale mas comida";
    }
    return errors;
  }

export default function CrearPokemon(){
    const dispatch = useDispatch();
    const tipo = useSelector((state) => state.tipo)

    const [input, setInput] = useState({
        name:"",
        vida:"",
        img:"",
        ataque:"",
        defensa:"",
        velocidad:"",
        altura:"",
        peso:"",
        tipo: []
    })

    const [errors, setErrors] = useState({});

    function handleChange(s){
        setInput({
            ...input,
            [s.target.name] : s.target.value 
        })
        setErrors(
            validacion({
              ...input,
              [s.target.name]: s.target.value,
            })
          );
    }

    function handleSelect(s){
        setInput({
            ...input,
            tipo: [...input.tipo, s.target.value] 
        })
    }

    function handleDelete(s){
        setInput({
            ...input,
            tipo: input.tipo.filter( a => a !== s)
        })
    }

    function handleSubmit(s){
        s.preventDefault();
        console.log(input)
        dispatch(createPokemon(input))
        alert("Pokemon creado correctamente")
        setInput({
        name:"",
        img: "",
        vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        altura: 0,
        peso: 0,
        tipo: []
        })

    }
    

    useEffect(() => {
        dispatch(getTipos());
    }, [tipo, dispatch])

    return (
        <div>
            <header className="headCreate">
                <button className="volver"><Link to='/home' className="textovolver">Volver al Inicio</Link></button>
                <ul className="head">
                <li><h1 className="tituloCrear">Crea tu Pokemon</h1></li>
                </ul>
                <Link to='/' className="titulo"><img className="titulo" src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d98dde45d242734.png"/></Link>
            </header>

            <div className="box">
            <div className="cont">
            <img className="gif" src="https://tupokeparada.files.wordpress.com/2016/08/213390pikaportadagif.gif"/>
            <form className='a' onSubmit={(s) => handleSubmit(s)}>
                <div className='form'>
                    <input className='errores' type= "text" value={input.name} name="name" placeholder="Nombre:" onChange={(s) => handleChange(s)}/>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className='form'>                   
                    <input className='errores' type= "number" value={input.vida} name="vida" min="1"  placeholder="Vida:"onChange={(s) => handleChange(s)}/>
                    {errors.vida && <p className="error">{errors.vida}</p>}
                </div>
                <div className='form'>
                    <div>
                    <input className='errores' type= "number" value={input.ataque} name="ataque" placeholder="Ataque:" min="1" onChange={(s) => handleChange(s)}/>
                    {errors.ataque && <p className="error">{errors.ataque}</p>}
                    </div>
                </div>
                <div className='form'>
                    <input className='errores' type= "number" value={input.defensa} name="defensa"  placeholder="Defensa:"min="1" onChange={(s) => handleChange(s)}/>
                    {errors.defensa && <p className="error">{errors.defensa}</p>}
                    
                </div>
                <div className='form'>
                    
                    <input className='errores' type= "number" value={input.velocidad} name="velocidad" placeholder="Velocidad:" min="1" onChange={(s) => handleChange(s)}/>
                    {errors.velocidad && <p className="error">{errors.velocidad}</p>}
                    
                </div>
                <div className='form'>
                    <input className='errores' type= "number" value={input.altura} name="altura" placeholder="Altura (CM):" min="1" onChange={(s) => handleChange(s)}/>
                    {errors.altura && <p className="error">{errors.altura}</p>}
                    
                </div>
                <div className='form'>
                    <input className='errores' type= "number" value={input.peso} name="peso" placeholder="Peso (KG):" min="1" onChange={(s) => handleChange(s)}/>
                    {errors.altura && <p className="error">{errors.peso}</p>}
                </div>
                <div className='form'>
                    <input className='errores' type= "text" value={input.img} name="img" placeholder="Imagen:" onChange={(s) => handleChange(s)}/>
                </div>
                <select className='form' onChange={(s) => handleSelect(s)}>
                    {tipo.map(tipo => 
                        (
                        <option value={tipo.name}>{tipo.name}</option>
                        )
                    )}
                </select>
                <button className='create' type='submit'>Crear Pokemon</button>
                
            </form>
            {input.tipo.map(t => 
                <div className="divX">               
                    <button className="botonX" onClick={() => handleDelete(t)}><p>{t}</p>x</button>
                </div>)}
            </div>
            </div>
        </div>
    )
}