import './style.css';
import { useState, useEffect } from 'react';
import GameHeader from '../../components/GameHeader';
import firestore from '../../firebase';
import { useMain } from '../../Context/Main';
import HistoryItem from '../../components/HistoryItem';

function History() {

    const {user} = useMain();

    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState([]);

    const usersRef = firestore.collection('users');
    const query = usersRef.doc(user.username).collection('scores').orderBy('time', 'desc');

    useEffect(() => {
        async function getData() {
            if (!user.username) return;

            const data = await query.get();
            setScores(data.docs);
        }
        getData();
        
        setLoading(false)
    }, [])

    return (
        <div className="container">
            <GameHeader/>
            <h2>Your History</h2>

            {
                loading ?
                    <p>Loading...</p>
                :(
                    <div className='itemsContainer'>
                        {
                            scores.map((score, i) => 
                                <HistoryItem
                                    time={score.data().time}
                                    score={score.data().score}
                                    best={user.bestScore === score.data().score}
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

export default History;