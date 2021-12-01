import './custom.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import YouTube from 'react-youtube';
import happyController from './controller.png';
import sadController from './brokenController.png';
import noRating from './noRating.png';
import Loader from "react-js-loader";



function Game(props){

  const [gameName, setGameName] = useState(null);
  const [description, setDesc] = useState(null);
  const [pfp, setPfp] = useState(null);
  const [screenshots, setScreenshoots] = useState([]);
  const [gameVideo, setVideo] = useState(null);
  const [score, setScore] = useState(0);
  const [gameId, setGameId] = useState(1);
  const [rating, setRating] = useState("");
  const [average, setAverage] = useState("N/A");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userReview, setReview] = useState('');
  const [loader, setLoader] = useState(<Loader type="bubble-loop" bgColor={"#05dbf7"} title={"loading data"} color={'#05dbf7'} size={100} />)

  useEffect(() => {
    const getGame = async (game) => {

      const response = await axios.get('http://localhost:8080/api?id=' + game.id);
      if (response.data.length !== 0) {
        setLoader('');
        setGameId(response.data.game.gameId);
        setScore(response.data.game.score);
        setVideo(response.data.game.video);
        setScreenshoots(response.data.game.gameScreenshots);
        setPfp(response.data.game.profilePicture);
        setDesc(response.data.game.description);
        setGameName(response.data.game.name);
        if(response.data.rating !== null){
          setRating(response.data.rating.score);
        }
        setReviews(response.data.game.gameReviews);
        console.log(response.data.game);
        if(response.data.averageRating !== null){
          setAverage(response.data.averageRating + "/5");
        }
      }
    }
    getGame(props);
  }, [props]);

  const rate = async (event) => {
    if(event.target.value !== ""){
      await axios.post('http://localhost:8080/game/rate?id=' + gameId + '&score=' + event.target.value).then((response) => {
        setRating(event.target.value);
    }).catch(() => {
        setMessage("You need to login for rating!")
    })     
    }
  }

  const postReview = async() => {
    if(userReview !== ""){
      await axios.post('http://localhost:8080/game/review?id=' + gameId + '&reviewText=' + userReview).then((response) => {
        setMessage2("Your review has been saved!")
    }).catch(() => {
        setMessage2("You need to login to post a review!")
    })
    }
  }

  const handleReview = (event) => {
    setReview(event.target.value);
  }

    const opts = {
      height: '390',
      width: '640'
    };

    let scorePicture = '';
    let scoreData = '';
    if(score > 65){
      scorePicture = <img style={{width: "100px", height: "100px"}} src={happyController}></img>
      scoreData = score + "/100"
    }else if(score < 65 && score > 0){
      scorePicture = <img style={{width: "100px", height: "100px"}} src={sadController}></img>
      scoreData = score + "/100"
    }else{
      scorePicture = <img style={{width: "100px", height: "100px"}} src={noRating}></img>;
    }

    let video = '';
    if(video !== null){
      video = <YouTube videoId={gameVideo} opts={opts} />
    }

    let carousel = '';
    if(screenshots != null){
      carousel = screenshots.map(screenshot =>
        <Carousel.Item key={screenshot.screenshotId}>
          <img className="h-50 w-100 d-inline-block" key={screenshot.image_id} src={"https://images.igdb.com/igdb/image/upload/t_original/" + screenshot.image_id + ".jpg"}></img>
        </Carousel.Item>
      )
    }

    let reviewCarousel = '';
    if(reviews !== [] && reviews !== null){
      for(const element of reviews){
        reviewCarousel = reviewCarousel + element.review
        if(!(element.reviewId === reviews[reviews.length - 1].reviewId)){
          reviewCarousel = reviewCarousel + " | ";
        }
      }
    }

    return (
      <Container>
        {loader}
        <Row>
          <Col>
            <h1>{gameName} {scorePicture}</h1>
          </Col>
          <Col>            
            <h2>Critics score: {scoreData} User score: {average}</h2>
            <select style={{marginTop: "10px"}} onClick={rate} value={rating}>
                              <option value="">Select a Rating</option>
                              <option value="5">Excellent</option>
                              <option value="4">Very Good</option>
                              <option value="3">Average</option>
                              <option value="2">Poor</option>
                              <option value="1">Terrible</option>
            </select> {message}
          </Col>
        </Row>
        <Row>
          <Col>
            <img style={{ height: "600px", width: "400px" }} src={"https://images.igdb.com/igdb/image/upload/t_original/" + pfp + ".jpg"}></img>
          </Col>
          <Col>
            {video}
            <p>{description}</p>
          </Col>
        </Row>
        <br/>
        <Row>
          <Carousel>
            {carousel}
          </Carousel>
          Reviews: <br/>
          {reviewCarousel}
          <br/>
          {message2}
          <textarea rows="4" cols="50" name="textValue" onChange={handleReview} placeholder="Post a review!" />
          <button onClick={postReview}>Review</button>
        </Row>
        <br/>
      </Container>
    );
}

export default Game;