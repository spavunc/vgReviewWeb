import './App.css';
import './custom.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Row, Col, Container } from 'react-bootstrap';
import {Link} from "@reach/router";
import DataService from './DataService';

function Home() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    const searchGames = async () => {
      const response = await DataService.retrieveAllCourses();
      if (response.data.length !== 0) {
        setGames(response.data);
      }
    }
    searchGames();
  }, []);

  let showcase = '';
    if(games != null){
      showcase = games.map(game =>
        <Col style={{textAlign: "center"}} key={game.gameId}>
          <Link to={"/game/" + game.apiId}>
            <img style={{ height: "250px", width: "180px" }} src={"https://images.igdb.com/igdb/image/upload/t_original/" + game.profilePicture + ".jpg"}></img>
            <p>{game.name}</p>
          </Link>
        </Col>
      )
    }

  return (
    <Container>
      <Row>
        {showcase}
      </Row>
      </Container>
  );

}

export default Home;