import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowBack from '../assets/back_arrow.png'

function BackButton({width, to, label}) {
    return (
        <Container>
            <Link to={to ?? '/'} className="link">
                <img width={width ?? 40} src={arrowBack} alt='< Back'/>
                <span>{label}</span>
            </Link>
        </Container>
    )
}

export default BackButton;

const Container = styled.div`
    position: absolute;
    left: 30px;
    cursor: pointer;

    .link {
        display: flex;
        align-items: center;
        text-decoration: none;
        
        span {
            color: #DDF;
            margin-left: 4px;
        }
    }

    :hover {
        opacity: 0.7;
    }
`