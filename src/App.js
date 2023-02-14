import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Bird from './components/Bird';

import city from './assets/city.jpg'
import ground from './assets/ground.png'

const BIRD_SIZE = 30
const BIRD_LEFT = 30
const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const GROUND_WIDTH = 1000
const GROUND_HEIGHT = 12
const GRAVITY = 8
const JUMP_HEIGHT = 80
const OBSTACLE_WIDTH = 40
const OBSTACLE_GAP = 200
const JUMP_COUNT_START = 4
//const OBSTACLE_SPEED = 10

function App() {

  //const [gameSize, setGameSize] = useState(500)
  const [birdPosition, setBirdPosition] = useState(250)
  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [obstacleHeight, setObstacleHeight] = useState(100)
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH)
  const [score, setScore] = useState(0)
  const [groundImgStart, setGroundImgStart] = useState(0)

  const [obstacleSpeed, setObstacleSpeed] = useState(10)
  const [gravity, setGravity] = useState(GRAVITY)
  const [jumpHeight, setJumpHeight] = useState(JUMP_HEIGHT)
  const [jumpCount, setJumpCount] = useState(0)


  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

  useEffect(()=>{
    let timeTid

    if(gameHasStarted){
      timeTid = setInterval(() => {
        let newPosition;
        
        if (jumpCount > 0){
          newPosition =  birdPosition - jumpHeight / JUMP_COUNT_START
          if (newPosition < 0){
            newPosition = 0
          }
          setJumpCount((jCount) => jCount - 1)
        }else{
          newPosition = birdPosition + gravity
          if (newPosition > GAME_HEIGHT - BIRD_SIZE){
            newPosition = GAME_HEIGHT - BIRD_SIZE
          }
        }

        setBirdPosition(newPosition)
      }, 24)
    }

    return () => {
      clearInterval(timeTid)
    }

  }, [birdPosition, gravity, gameHasStarted, jumpCount, jumpHeight])


  //Updating game speed:
  useEffect(() => {
    if(score % 3 === 0){
      setObstacleSpeed((speed) => speed + 1)
      setGravity((gravity) => gravity + 0.2)
      setJumpHeight((jumpHeight) => jumpHeight + 0.2)
    }
  }, [score])


  //updating Obstacles and Ground position
  useEffect(()=>{
    let obstacleId

    if(gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH){
      obstacleId = setInterval(() => {
        setObstacleLeft(obstacleLeft - obstacleSpeed)
        setGroundImgStart((pos) => {
          let newPos = pos + obstacleSpeed
          if (newPos > GROUND_WIDTH/2) newPos = 0
          return newPos
        }
        )
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
        //let newBirdPosition = birdPosition - jumpHeight

        setJumpCount(JUMP_COUNT_START)

        if (!gameHasStarted){
          setGameHasStarted(true)
        }
    
        // if (newBirdPosition < 0){
        //   setBirdPosition(0)
        // }else{
        //   setBirdPosition(newBirdPosition)
        // }
         
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
    <Main>
      <Div>
        <GameBox width={GAME_WIDTH} height={GAME_HEIGHT + GROUND_HEIGHT} image={city}>
          <Obstacle
            top={0}
            width={OBSTACLE_WIDTH}
            height={obstacleHeight}
            left={obstacleLeft}
          />
          <Obstacle
            top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
            width={OBSTACLE_WIDTH}
            height={bottomObstacleHeight}
            left={obstacleLeft}
          />
          <Bird size={BIRD_SIZE} top={birdPosition} left={BIRD_LEFT}/>
          <Ground
            width={GROUND_WIDTH}
            height={GROUND_HEIGHT}
            image={ground}
            imgStart={groundImgStart}
          />
        </GameBox>
        <span>{score}</span>
        <Footer controlsContent={["a / space - Jump", "Enter - Pause"]} />
      </Div>

    </Main>
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
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: center;
  & span {
    color: white;
    background-color: #3C355090;
    padding 2px 8px;
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

const Ground = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  left: -${(props) => props.imgStart}px;
  bottom: 0px;
  background-image: url(${(props) => props.image});
  background-repeat: repeat;
  background-size: cover;
  background-color: gray;
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