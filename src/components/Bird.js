import React from "react";
import styled from 'styled-components';
import { useMain } from "../Context/Main";

import black from '../assets/birds/black.png';
import blue from '../assets/birds/blue.png';
import green from '../assets/birds/green.png';
import grey from '../assets/birds/grey.png';
import pink from '../assets/birds/pink.png';
import purple from '../assets/birds/purple.png';
import red from '../assets/birds/red.png';
import yellow from '../assets/birds/yellow.png';

function Bird({size, top, left}){

    const {user} = useMain()

    const birds = {
        'yellow': yellow,
        'red': red,
        'pink': pink,
        'purple': purple,
        'blue': blue,
        'green': green,
        'grey': grey,
        'black': black,
    };

    return (
        <BirdContainer
            size={size}
            top={top}
            left={left}
        >
            <img src={birds[user?.bird] ?? birds.yellow} alt="B"/>
        </BirdContainer>
    )
}

export default Bird


const BirdContainer = styled.div.attrs(props => ({
style: {
    left: props.left ?? 0,
    top: props.top,
    width: props.size,
    height: props.size,
},
}))`
  position: absolute;
  display: flex;  
  border-radius: 50%;
`