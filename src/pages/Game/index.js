import './style.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Bird from '../../components/Bird';

import city from '../../assets/city.jpg'
import ground from '../../assets/ground.png'
import Modal from '../../components/Modal';
import constants from '../../utils/constants';


function Game() {

  const [birdPosition, setBirdPosition] = useState(250)
  const [score, setScore] = useState(0)

  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameHasPaused, setGameHasPaused] = useState(false)


  const [obstacleHeight, setObstacleHeight] = useState(100)
  const [obstacleLeft, setObstacleLeft] = useState(constants.GAME_WIDTH)
  const [groundImgStart, setGroundImgStart] = useState(0)

  const [obstacleSpeed, setObstacleSpeed] = useState(constants.OBSTACLE_SPEED)
  const [gravity, setGravity] = useState(constants.GRAVITY)
  const [jumpHeight, setJumpHeight] = useState(constants.JUMP_HEIGHT)
  const [jumpCount, setJumpCount] = useState(0)


  const bottomObstacleHeight = constants.GAME_HEIGHT - constants.OBSTACLE_GAP - obstacleHeight


  // Bird motion
  useEffect(()=>{
    let timeTid

    if(gameHasStarted && !gameHasPaused && !isGameOver){
      timeTid = setInterval(() => {
        let newPosition;
        
        if (jumpCount > 0){
          newPosition =  birdPosition - jumpHeight / constants.JUMP_COUNT_START
          if (newPosition < 0){
            newPosition = 0
          }
          setJumpCount((jCount) => jCount - 1)
        }else{
          newPosition = birdPosition + gravity
          if (newPosition > constants.GAME_HEIGHT - constants.BIRD_SIZE){
            newPosition = constants.GAME_HEIGHT - constants.BIRD_SIZE
          }
        }

        setBirdPosition(newPosition)
      }, 24)
    }

    return () => {
      clearInterval(timeTid)
    }

  }, [birdPosition, gravity, gameHasStarted, isGameOver, gameHasPaused, jumpCount, jumpHeight])


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

    if (gameHasPaused || isGameOver) return

    if(gameHasStarted && obstacleLeft >= -constants.OBSTACLE_WIDTH){
      obstacleId = setInterval(() => {
        setObstacleLeft(obstacleLeft - obstacleSpeed)
        setGroundImgStart((pos) => {
          let newPos = pos + obstacleSpeed
          if (newPos > constants.GROUND_WIDTH/2) newPos = 0
          return newPos
        }
        )
      }, 24)
    }else{
      setObstacleLeft(constants.GAME_WIDTH)
      setObstacleHeight(Math.floor(Math.random() * (constants.GAME_HEIGHT - constants.OBSTACLE_GAP)))

      if (gameHasStarted) setScore((score) => score + 1)
    }

    return () => {
      clearInterval(obstacleId)
    }

  }, [gameHasStarted, gameHasPaused, isGameOver, obstacleLeft, obstacleSpeed])

  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight
    const hasCollidedWithBottomObstacle = birdPosition <= constants.GAME_HEIGHT 
      && birdPosition + constants.BIRD_SIZE >= constants.GAME_HEIGHT - bottomObstacleHeight

    if (obstacleLeft >= -constants.OBSTACLE_WIDTH && obstacleLeft <= constants.BIRD_SIZE + constants.BIRD_LEFT
      && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)){
      setIsGameOver(true)
      setJumpCount(0)
    }
  }, [obstacleLeft, birdPosition, bottomObstacleHeight, obstacleHeight])


  // Handle press
  useEffect(() => {
    function handleClick(e) {
      if (e.key === 'a' || e.key === 'Enter' || e.key === 'ArrowUp'){
        //let newBirdPosition = birdPosition - jumpHeight

        if (!gameHasStarted && !isGameOver){
          setGameHasStarted(true)
        }

        if (isGameOver && e.key === 'Enter'){
          setScore(0)
          setObstacleSpeed(constants.OBSTACLE_SPEED)
          setObstacleLeft(constants.GAME_WIDTH)
          setBirdPosition(250)
          setIsGameOver(false)
        }else{
          setJumpCount(constants.JUMP_COUNT_START)
        }
    
        // if (newBirdPosition < 0){
        //   setBirdPosition(0)
        // }else{
        //   setBirdPosition(newBirdPosition)
        // }
         
      }else if (e.key === ' ' && gameHasStarted && !isGameOver){
        setGameHasPaused(s => !s)
        //gameHasStarted(false)
      }

      
    }

    window.addEventListener('keydown', handleClick)

    return () => {
      window.removeEventListener('keydown', handleClick)
    }


  })



  return (
      <Div>
        <GameBox width={constants.GAME_WIDTH} height={constants.GAME_HEIGHT + constants.GROUND_HEIGHT} image={city}>

          {
            !gameHasStarted &&
            <Modal transparent content="Press 'A' to start"/>
          }

          {
            gameHasPaused &&
            <Modal title="Paused" content="Press 'Space' to resume"/>
          }

          {
            isGameOver &&
            <Modal title="Game Over!" content="Press 'Enter' to restart">
              <strong className='score-text'>Your Score: <p>{score}</p></strong>
              <p>Best: 0</p>
              <br/>
            </Modal>
          }

          <Obstacle
            top={0}
            width={constants.OBSTACLE_WIDTH}
            height={obstacleHeight}
            left={obstacleLeft}
          />
          <Obstacle
            top={constants.GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
            width={constants.OBSTACLE_WIDTH}
            height={bottomObstacleHeight}
            left={obstacleLeft}
          />
          <Bird size={constants.BIRD_SIZE} top={birdPosition} left={constants.BIRD_LEFT}/>
          <Ground
            width={constants.GROUND_WIDTH}
            height={constants.GROUND_HEIGHT}
            image={ground}
            imgStart={groundImgStart}
          />
        </GameBox>
        <span>{score}</span>
        <Footer controlsContent={["JUMP - a / ↑ / Enter", "PAUSE - Space"]} />
      </Div>

  );
}

export default Game;


const Div = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: center;
  & span {
    color: white;
    background-color: #3C355090;
    padding: 2px 8px;
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