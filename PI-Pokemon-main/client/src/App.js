import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";

// import Detail from "./components/Detail";
import PokemonCreate from "./components/PokemonCreate";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/pokemon" component={Pokemon} />
          <Route exact path="/create" component={PokemonCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
