import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Bird from './components/Bird';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onDisconnect, onValue, onChildAdded, onChildChanged, onChildRemoved, update } from "firebase/database";
import city from './assets/city.jpg'
import ground from './assets/ground.png'
import Modal from './components/Modal';

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
const OBSTACLE_SPEED = 10

const firebaseConfig = {
  apiKey: "AIzaSyAiIoGddi-ueyFCY_Y0dgeNfsJWj4U3G4o",
  authDomain: "flappy-app-6e760.firebaseapp.com",
  databaseURL: "https://flappy-app-6e760-default-rtdb.firebaseio.com",
  projectId: "flappy-app-6e760",
  storageBucket: "flappy-app-6e760.appspot.com",
  messagingSenderId: "485228613222",
  appId: "1:485228613222:web:536454db416b4687ec67a7"
};

function App() {

  //const [gameSize, setGameSize] = useState(500)
  const [birdPosition, setBirdPosition] = useState(250)
  const [score, setScore] = useState(0)

  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameHasPaused, setGameHasPaused] = useState(false)


  const [obstacleHeight, setObstacleHeight] = useState(100)
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH)
  const [groundImgStart, setGroundImgStart] = useState(0)

  const [obstacleSpeed, setObstacleSpeed] = useState(OBSTACLE_SPEED)
  const [gravity, setGravity] = useState(GRAVITY)
  const [jumpHeight, setJumpHeight] = useState(JUMP_HEIGHT)
  const [jumpCount, setJumpCount] = useState(0)
  const [playerRef, setPlayerRef] = useState(null);
  const [player, setPlayer] = useState();
  //Firebase - Connection
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);

  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

  const [players, setPlayers]  = useState([]);

const allPlayersRef = ref(database, 'players');


useEffect(()=> {
  let l1 = [];
  let data;
  onValue(allPlayersRef, (snapshot)=>{
    data = snapshot.val();    
    for(let d in data){
      l1.push(data[d])
    }
  })
  
  setPlayers(l1)
  
}, [])

  useEffect(()=>{
    let timeTid

    if(gameHasStarted && !gameHasPaused && !isGameOver){
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

  }, [gameHasStarted, gameHasPaused, isGameOver, obstacleLeft, obstacleSpeed])

  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight
    const hasCollidedWithBottomObstacle = birdPosition <= GAME_HEIGHT 
      && birdPosition + BIRD_SIZE >= GAME_HEIGHT - bottomObstacleHeight

    if (obstacleLeft >= -OBSTACLE_WIDTH && obstacleLeft <= BIRD_SIZE + BIRD_LEFT
      && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)){
    setPlayer({
      id: player.id,
      score: score,
      username: player.username
    })
    player.score = score;
    update(playerRef, player);  
    setIsGameOver(true)
    setJumpCount(0)
    
    }
  }, [obstacleLeft, birdPosition, bottomObstacleHeight, obstacleHeight])


  useEffect(() => {
    function handleClick(e) {
      if (e.key === 'a' || e.key === 'Enter' || e.key === 'ArrowUp'){
        //let newBirdPosition = birdPosition - jumpHeight

        if (!gameHasStarted && !isGameOver){
          setGameHasStarted(true)
        }

        if (isGameOver && e.key === 'Enter'){
          setScore(0)
          setObstacleSpeed(OBSTACLE_SPEED)
          setObstacleLeft(GAME_WIDTH)
          setBirdPosition(250)
          setIsGameOver(false)
        }else{
          setJumpCount(JUMP_COUNT_START)
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

  function firebaseConnection(){
    signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let playerId = user.uid;
        setPlayerRef(ref(database, 'players/' + playerId));
        let player = {
          id: playerId,
          username: "Mauluniqu",
          score: 0
        }
        setPlayer(player);
        set(playerRef,player);

        onDisconnect(ref(database, 'players/' + playerId)).remove();
      } else {
        console.log("You are logout")
      }
      
    });
    
    
  }

  useEffect(() => {
    firebaseConnection();
  }, []);

  return (
    <Main>
      <Div>
        <GameBox width={GAME_WIDTH} height={GAME_HEIGHT + GROUND_HEIGHT} image={city}>

          {
            !gameHasStarted &&
            <Modal transparent content="Press 'A' to start"/>
          }

          {
            gameHasPaused &&
            <Modal title="Paused" content="Press 'Enter' to resume"/>
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
        <Footer controlsContent={["JUMP - a / ↑ / Enter", "PAUSE - Space"]} />
      </Div>
        {
          players.map((data, key)=>{
            console.log(players)
            return ( <div key={key} >{data.username +" "+ data.score}</div>);
          })
        }
          
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