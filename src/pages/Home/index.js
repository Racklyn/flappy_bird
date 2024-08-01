import Button from "../../components/Button";
import image from '../../assets/home_image.png'
import './style.css';

function Home() {
    return (
        <div className="container">
            <h1>Flappy Bird</h1>

            <img
                style={{flexGrow: 1, marginBottom: 50}}
                height={100}
                src={image}
                alt="logo"
            />

            <Button
                style={{marginBottom: 20}}
                onClick={()=>alert('Olá')}
            >
                LOGIN
            </Button>
            <Button
                style={{marginBottom: 60}}
            >
                CADASTRAR
            </Button>
        </div>
    )
    
}

export default Home;