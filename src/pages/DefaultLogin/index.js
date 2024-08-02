import './style.css';
import { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../../components/BackButton';
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../Context/Main';
import firestore from '../../firebase';

import black from '../../assets/birds/black.png';
import blue from '../../assets/birds/blue.png';
import green from '../../assets/birds/green.png';
import grey from '../../assets/birds/grey.png';
import pink from '../../assets/birds/pink.png';
import purple from '../../assets/birds/purple.png';
import red from '../../assets/birds/red.png';
import yellow from '../../assets/birds/yellow.png';


function DefaultLogin({isNewUser}) {

    const navigate = useNavigate();
    const {setUser} = useMain();

    const usersRef = firestore.collection('users');


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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedBird, setSelectedBird] = useState('yellow');
    const [loading, setLoading] = useState(false);


    function handleBirdSelector(bird) {
        if (loading) return;
        setSelectedBird(bird);
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!username || !password) {
            alert('Preencha todos os campos!')
            return;
        }

        
        try {
            setLoading(true);

            if (isNewUser) {
                const newUser = {
                    password,
                    bird: selectedBird,
                    bestScore: 0,
                }
                await usersRef.doc(username).set(newUser);
                setUser({...newUser, username});
            }else {
                const doc = await usersRef.doc(username).get();
                if (!doc.exists || doc.data().password !== password){
                    throw new Error('Wrong username or password!');
                }
                setUser({
                    ...doc.data(),
                    username
                });
            }

            navigate('/fly');
        } catch (error) {
            alert(error)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="container" onSubmit={(e) => handleFormSubmit(e)}>
            <header>
                <BackButton/>
                <h1>{isNewUser ? 'New player' : 'Login'}</h1>
            </header>

            <Input
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                readOnly={loading}
            />

            <Input
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                readOnly={loading}
                password
            />


            <div className="colorContainer">
                {
                    isNewUser &&
                    <>
                        <p style={{fontSize: 30}}>
                            Choose your bird
                        </p>

                        <div className="selectorContainer">
                            {
                                Object.entries(birds).map((e, i) => {
                                    const [bird, img] = e;
                                    return (
                                        <BirdColorSelector
                                            isSelected={bird === selectedBird}
                                            loading={loading}
                                            onClick={() => handleBirdSelector(bird)}
                                            key={i}
                                        >
                                            <img width={30} src={img} alt={bird}/>
                                        </BirdColorSelector>
                                    )
                                })
                            }                            
                        </div>
                    </>
                }
            </div>

            {
                loading
                ? (
                    <p style={{fontSize: 20}}>Loading...</p> 
                ) : (
                    <Button
                        hidden={loading}
                        style={{marginBottom: 60}}
                        disabled={!username || !password}
                        type='submit'
                    >
                        {isNewUser ? 'Register' : 'Login'}
                    </Button>
                )
            }
        </form>
    )
    
}

export default DefaultLogin;

const BirdColorSelector = styled.span`
    background-color: ${(props) => props.isSelected ? '#FFFE' : '#FFFC'};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    user-select: none;
    cursor: ${(props) => (!props.isSelected && !props.loading) && 'pointer'};
    
    border: ${(props) => props.isSelected ? '2px solid #EFBB18' : 'none'};
    transform: ${(props) => props.isSelected ? 'scale(1.05)': 'none'};
    bottom: ${(props) => props.isSelected ? '1px' : '0'};
    position: relative;

    :hover {
        opacity: ${(props) => !props.isSelected && 0.9};
        transform: ${(props) => !props.loading && 'scale(1.05)'};
    }
`