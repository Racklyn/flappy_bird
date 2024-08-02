import styled from "styled-components";

function HistoryItem({time, score, best}) {

    return (
        <Container>
            <span className="pts">
                <strong>{score}</strong>
                pts
            </span>
            <BestScoreTag hidden={!best}>
                Best
            </BestScoreTag>
            <span className="date">
                {time ? new Date(time).toLocaleString() : '---'}
            </span>
        </Container>
    )
}

export default HistoryItem;

const Container = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #88A9;
    margin-bottom: 6px;
    border-radius: 4px;
    padding: 0px 20px;

    .pts {
        color: #335;
    }

    .date {
        flex-grow: 1;
        color: #446;
        text-align: end;
    }

    strong {
        font-size: 26px;
        margin-right: 10px;
        color: #FFF;
        text-shadow: 2px 1px 0px #000;
    }

`

const BestScoreTag = styled.div`
    background-color: #7D7;
    padding: 0 4px;
    margin-left: 50px;
    border-radius: 4px;
    border: 1px solid #273;
`