import './style.css';
import { useState } from 'react';
import GameHeader from '../../components/GameHeader';
import RankingItem from '../../components/RankingItem';
import firestore from '../../firebase';
import { useEffect } from 'react';

function Ranking() {

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
                            bestUsers.map((user, i) => 
                                <RankingItem
                                    pos={i}
                                    username={user.id}
                                    time={user.data().bestScoreTime}
                                    score={user.data().bestScore}
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