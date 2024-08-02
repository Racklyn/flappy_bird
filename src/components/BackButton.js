import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowBack from '../assets/back_arrow.png'

function BackButton() {
    return (
        <Container>
            <Link to='/'>
                <ArrowImg width={35} src={arrowBack} alt='< Voltar'/>
            </Link>
        </Container>
    )
}

export default BackButton;

const Container = styled.div`
    position: absolute;
    left: 30px;
`

const ArrowImg = styled.img`
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }
`