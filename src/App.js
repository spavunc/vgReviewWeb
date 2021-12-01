import { useState, useEffect } from 'react';
import axios from 'axios';
import './custom.css';
import { Link, navigate } from "@reach/router";
import Game from "./Game";
import './App.css';
import Home from './Home';
import AuthenticationService from './AuthenticationService';

function App() {

  const [games, setGames] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState(null);
  const [loginLink, setLoginLink] = useState('');
  const [loginText, setLoginText] = useState('Login');

  useEffect(() => {
    const searchGames = async () => {
      const response = await axios.get('http://localhost:8080/api?name=' + search);
      if (response.data.length !== 0) {
        setGames(response.data);
      }
    }
    const timeoutId = setTimeout(() => {
      if (search !== null) {
        searchGames();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);


  const onChangeHandler = (textData) => {
    if (textData.length > 1) {
      setSearch(textData)
    }
    setText(textData);
  }

  const onSuggestHandler = (game) => {
    console.log(game);
    setText(game.name);
  }

  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/login" >Login</Link>{" "}
        <Link to="/register" >Register</Link>    
        <Link to="/logout" onClick={AuthenticationService.logout} style={{float: "right"}}>Logout</Link>    
      </nav>

      <input type="text" className="col-md-12 input" style={{ marginTop: 10 }} onChange={e => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setGames([])
          }, 100);
        }} />
      {games && games.map((game, i) =>
        <div key={i} className="game col-md-12 justify-content-md-center" onClick={() => onSuggestHandler(game)}>
          <Link to={"/game/" + game.id} game={game.id}>
            {<img src={"https://images.igdb.com/igdb/image/upload/t_original/" + game.coverImageId + ".jpg"}></img>}{game.name}
          </Link></div>
      )}
    </div>

  );

}

export default App;
