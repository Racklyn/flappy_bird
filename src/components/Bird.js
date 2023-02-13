import React from "react";
import styled from 'styled-components';

import bird from '../assets/bird.png'

function Bird({size, top, left}){

    return (
        <BirdContainer
            size={size}
            top={top}
            left={left}
        >
            <img src={bird} alt="B"/>
        </BirdContainer>
    )
}

export default Bird


const BirdContainer = styled.div`
  position: absolute;
  display: flex;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left ?? 0}px;
  border-radius: 50%;
`