import './style.css';
import { useState, useEffect } from 'react';
import GameHeader from '../../components/GameHeader';
import RankingItem from '../../components/RankingItem';
import firestore from '../../firebase';
import { useMain } from '../../Context/Main';

function Ranking() {

    const {user} = useMain();

    const [loading, setLoading] = useState(true);
    const [bestUsers, setBestUsers] = useState([]);

    const usersRef = firestore.collection('users');
    const query = usersRef.orderBy('bestScore', 'desc').limit(10);

    useEffect(() => {
        async function getData() {
            const data = await query.get();
            setBestUsers(data.docs);
        }
        getData();
        
        setLoading(false)
    }, [])

    return (
        <div className="container">
            <GameHeader/>
            <h2>Ranking</h2>

            {
                loading ?
                    <p>Loading...</p>
                :(
                    <div className='itemsContainer'>
                        {
                            bestUsers.map((bestU, i) => 
                                <RankingItem
                                    isCurrentPlayer={bestU.id === user.username}
                                    pos={i}
                                    username={bestU.id}
                                    time={bestU.data().bestScoreTime}
                                    score={bestU.data().bestScore}
                                    key={i}
                                />
                            )
                        }
                    </div>
                )

            }
        </div>
    )
}

export default Ranking;