import styled from "styled-components";
import historyIcon from '../assets/history_icon.png'
import rankingIcon from '../assets/ranking_icon.png'
import BackButton from "./BackButton";
import { Link } from "react-router-dom";
import { useMain } from "../Context/Main";

function GameHeader({showMenuOptions}) {

    const mainContext = useMain();

    return (
        <Header>
            <strong>FLAPPY BIRD</strong>
            <Separator/>
            <div className="menu">
                {
                    showMenuOptions
                    ? (
                        <span>
                            <Link to='/history'>
                                <MenuBtn style={{marginRight: 6}}>
                                    <img src={historyIcon} width={20}/>
                                    History
                                </MenuBtn>
                            </Link>

                            <Link to='/ranking'>
                                <MenuBtn>
                                    <img src={rankingIcon} width={20}/>
                                    Ranking
                                </MenuBtn>
                            </Link>
                        </span>
                    ) : (
                        <span>
                            <BackButton width={26} to='/fly' label='Back'/>
                        </span>
                    )

                }

                <span>
                    <Username>{mainContext.user?.username ?? '...'}</Username>
                    <BestScore>
                        Best score <strong>{mainContext.user?.bestScore ?? '-'}</strong>
                    </BestScore>
                </span>
            </div>
        </Header>
    )
}

export default GameHeader;

const Header = styled.header`
    background-color: #3C3550;
    height: 80px;
    padding: 0px;

    strong {
        color: #FFF;
        font-size: 20px;
    }

    .menu {
        display: flex;
        width: 90%;
        justify-content: space-between;

        span {
            display: flex;
        }
    }
`

const Separator = styled.hr`
    width: 90%;
    border-style: solid;
    border-width: 1px;
    border-color: #FFF6;
    margin-top: 0;
`

const MenuBtn = styled.button`
    padding: 0 2px;
    height: 24px;
    width: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    background-color: #FFF8;
    font-size: 14px;
    cursor: pointer;

    img {
        margin-right: 4px;
    }

    :hover {
        background-color: #FFFA;
    }
`

const Username = styled.span`
    color: #DDF;
    font-size: 18px;
    margin-right: 40px;
    display: flex;
    align-items: center;
`

const BestScore = styled.span`
    display: flex;
    align-items: center;
    color: #EEF7;
    font-size: 16px;

    strong {
        margin-left: 6px;
        color: #FFF;
    }
`