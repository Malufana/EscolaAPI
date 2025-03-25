import React, { useState } from "react";
import estilos from './style.module.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Footer } from "../../components/Footer";

export default function Login(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const logar = async () =>{
        console.log("Usuario: ", user);
        console.log("Senha: ", password);

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/token/",
                {
                    username: user,
                    password: password
                }
            )
            console.log("TOKEN LOGIN", response.data.access);
            localStorage.setItem('token', response.data.access);
            
            navigate('/home');

        } catch(error){
            console.error(error)
        }
    }
        

    return(
        <main>
            <div className={estilos.container_login}>
                <div className={estilos.container_elementos}>
                    <h1>LOGIN</h1>
                    <input 
                        type="text"
                        className={estilos.caixa}
                        placeholder="USER"
                        onChange={(e) => {setUser(e.target.value)}}
                        value={user}
                    />

                    <input 
                        type="password"     
                        className={estilos.caixa}
                        placeholder="PASSWORD"
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                    />

                    <button onClick={logar} className={estilos.btn}>ENTER</button>
                </div>
            </div>
            <Footer />
        </main>
        
    )
}