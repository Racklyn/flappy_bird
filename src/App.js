import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Bird from './components/Bird';

import city from './assets/city.jpg'
import wall from './assets/wall.png'

const BIRD_SIZE = 30
const BIRD_LEFT = 30
const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const GRAVITY = 8
const JUMP_HEIGHT = 100
const OBSTACLE_WIDTH = 40
const OBSTACLE_GAP = 200
//const OBSTACLE_SPEED = 10

function App() {

  //const [gameSize, setGameSize] = useState(500)
  const [birdPosition, setBirdPosition] = useState(250)
  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [obstacleHeight, setObstacleHeight] = useState(100)
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH)
  const [score, setScore] = useState(0)
  const [obstacleSpeed, setObstacleSpeed] = useState(10)

  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

  useEffect(()=>{
    let timeTid

    if(gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE){
      timeTid = setInterval(() => {
        setBirdPosition(birdPosition + GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeTid)
    }

  }, [birdPosition, gameHasStarted])


  //Updating game speed:
  useEffect(() => {
    if(score%3 === 0){
      setObstacleSpeed((speed) => speed + 1)
    }
  }, [score])


  useEffect(()=>{
    let obstacleId

    if(gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH){
      obstacleId = setInterval(() => {
        setObstacleLeft(obstacleLeft - obstacleSpeed)
      }, 24)
    }else{
      setObstacleLeft(GAME_WIDTH)
      setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)))

      if (gameHasStarted) setScore((score) => score + 1)
    }

    return () => {
      clearInterval(obstacleId)
    }

  }, [gameHasStarted, obstacleLeft, obstacleSpeed])

  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight
    const hasCollidedWithBottomObstacle = birdPosition <= GAME_HEIGHT 
      && birdPosition + BIRD_SIZE >= GAME_HEIGHT - bottomObstacleHeight

    if (obstacleLeft >= -OBSTACLE_WIDTH && obstacleLeft <= BIRD_SIZE + BIRD_LEFT
      && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)){
      setGameHasStarted(false)
      setScore(0)
      setBirdPosition(250)
    }
  }, [obstacleLeft, birdPosition, bottomObstacleHeight, obstacleHeight])

  useEffect(() => {
    function handleClick(e) {
      if (e.key === 'a' || e.key === ' ' || e.key === 'ArrowUp'){

        let newBirdPosition = birdPosition - JUMP_HEIGHT
        if (!gameHasStarted){
          setGameHasStarted(true)
        }
    
        if (newBirdPosition < 0){
          setBirdPosition(0)
        }else{
          setBirdPosition(newBirdPosition)
        }
         
      }else if (e.key === 'Enter'){
        alert('Game paused')
        gameHasStarted(false)
      }
    }

    window.addEventListener('keydown', handleClick)

    return () => {
      window.removeEventListener('keydown', handleClick)
    }


  })




  return (
    <Div>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT} image={city}>
        <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
          //image={wall}
        />
        <Obstacle
          top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
          //image={wall}
        />
        <Bird size={BIRD_SIZE} top={birdPosition} left={BIRD_LEFT}/>
      </GameBox>
      <span>{score}</span>
      <Footer controlsContent={["a / space - Jump"]} />
    </Div>
  );
}

export default App;





// const Bird = styled.div`
//   position: absolute;
//   background-color: orange;
//   height: ${(props) => props.size}px;
//   width: ${(props) => props.size}px;
//   top: ${(props) => props.top}px;
//   left: ${(props) => props.left ?? 0}px;
//   border-radius: 50%;
// `


const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  & span {
    color: white;
    font-size: 24px;
    position: absolute;
    z-index: 2;
  }
`

const GameBox = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #29F;
  overflow: hidden;
`

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #549;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;

`