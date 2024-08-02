import './style.css';
import GameHeader from '../../components/GameHeader';
import RankingItem from '../../components/RankingItem';

function Ranking() {

    const bestUsers = ['aaa', 'bbb', 'ccc', 'ddd', 'eee']

    return (
        <div className="container">
            <GameHeader/>
            <h2>Ranking</h2>

            <div className='itemsContainer'>
                {
                    bestUsers.map((user, i) => 
                        <RankingItem pos={i} key={i}/>
                    )
                }
            </div>
        </div>
    )
}

export default Ranking;