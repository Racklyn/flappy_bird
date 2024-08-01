import Button from "../../components/Button";
import image from '../../assets/home_image.png'
import './style.css';
import { Link } from "react-router-dom";

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

            <Link to="/login">
                <Button style={{marginBottom: 20}}>
                    LOGIN
                </Button>
            </Link>

            <Link to="/register">
                <Button
                    style={{marginBottom: 60}}
                >
                    CADASTRAR
                </Button>
            </Link>
        </div>
    )
    
}

export default Home;