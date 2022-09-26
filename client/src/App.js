import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componentes/LandingPage/LandingPage';
import Home from './componentes/Home/Home'
import CrearPokemon from './componentes/PokemonCreate/PokemonCreate';
import Detalle from './componentes/Details/Details';

function App() {
  return (
    <BrowserRouter>  
    <div className="App">
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet"/>
      <Switch>
      <Route exact path='/' component= {LandingPage}/>
      <Route path='/home' component= {Home}/>
      <Route path='/crear' component= {CrearPokemon}/>
      <Route path='/detalle/:id' component= {Detalle}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
