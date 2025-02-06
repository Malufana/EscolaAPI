import React, { useState, useEffect } from "react";
import axios from 'axios';
import estilos from './styles.module.css'
import {FaEdit, FaTrash, FaSearch} from "react-icons/fa";

export default function Home(){
    const [dados, setDados] = useState([])
    const token = localStorage.getItem("token") || "";
    console.log("Token Home: ", token);


    useEffect(() => {
        if (!token) {
            console.warn("Nenhum token encontrado!");
            return;
        }

        const fetchData = async () =>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/prof/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
                console.log()
                
            }catch(error){
                console.error(error)
            }
        }
        fetchData();
    }, [token]);

    return(
        <div>
            <div className={estilos.container_home}>
                <h1>HOME</h1>
                <div className={estilos.listaProf}>
                    <h2>LISTA DE PROFESSORES</h2>
                    {dados.map((professor)=>(
                        <div>
                            <span className={estilos.id}>{professor.id}</span>
                            <span className={estilos.ni}>{professor.ni}</span>
                            <span className={estilos.nome}>{professor.nome}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}