import styled from "styled-components";

function RankingItem({pos, username, time, score, isCurrentPlayer}) {

    const podium = ['gold', '#BCC8CF', '#C53'];

    return (
        <Container highlighted={isCurrentPlayer}>
            <Position
                borderColor={podium[pos]}
            >{pos+1}</Position>
            <span className="username">{username}</span>
            <span className="date">
                {time ? new Date(time).toLocaleString() : '---'}
            </span>
            <strong>{score}</strong>
        </Container>
    )
}

export default RankingItem;

const Container = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.highlighted ? '#99B9' : '#AAB9'};
    margin-bottom: 6px;
    border-radius: 4px;
    padding: 0px 12px;

    .username, .date {
        flex-grow: 1;
    }

    .username {
        font-size: 18px;
        color: #113;
        text-decoration: ${(props) => props.highlighted && 'underline'};
    }

    .date {
        color: #557;
        text-align: end;
    }

    strong {
        margin-left: 36px;
        font-size: 22px;
        width: 20px;
        color: #4A4380;
        text-shadow: 1px 1px 0px #000;
    }

`

const Position = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bolder;
    margin-right: ${(props) => !props.borderColor ? '19px' : '16px' };
    margin-left: ${(props) => !props.borderColor && '3px' };
    border-radius: 50%;
    border: ${(props) => props.borderColor ? 'solid 3px ' + props.borderColor : 'none'};
`