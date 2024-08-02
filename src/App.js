import './App.css';
import styled from 'styled-components';
import Router from './routes';
import constants from './utils/constants';
import { MainContextProvider, useMain } from './Context/Main';
import Home from './pages/Home';


function App() {
  const {user} = useMain();

  return (
    <Main>
      <MainContextProvider>
        <Screen width={constants.SCREEN_WIDTH} height={constants.SCREEN_HEIGHT}>
          <Router/>
        </Screen>
      </MainContextProvider>
    </Main>
  );
}

export default App;


const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Screen = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`