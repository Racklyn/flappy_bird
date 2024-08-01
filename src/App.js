import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Router from './routes';


function App() {

  return (
    <Main>
      <Router/>
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