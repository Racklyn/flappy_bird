import './style.css';
import Button from "../../components/Button";
import Input from "../../components/Input";
import birdImg from '../../assets/bird.png'

function DefaultLogin({isNewUser}) {
    return (
        <form className="container">
            <h1>{isNewUser ? 'Novo usuário' : 'Login'}</h1>

            <Input
                label="Username"
            />

            <Input
                label="Senha"
                password
            />

            <div className="colorContainer">
                <p style={{fontSize: 30}}>
                    Cor do Bird
                </p>

                <div>
                    {/* TODO: Tornar essas imagens responsivas */}
                    <img width={20} src={birdImg}/>
                    {/* <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/>
                    <img width={20} src={birdImg}/> */}
                </div>
            </div>

            <Button style={{marginBottom: 60}} type='submit'>
                {isNewUser ? 'Cadastrar' : 'Entrar'}
            </Button>
        </form>
    )
    
}

export default DefaultLogin;