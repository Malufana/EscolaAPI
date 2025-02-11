import React, { useState, useEffect } from "react";
import axios from 'axios';
import estilos from './styles.module.css'
import {FaEdit, FaTrash, FaSearch, FaPlus} from "react-icons/fa";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer"

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
        <main>
            <div className={estilos.container_home}>
                <Header/>
                <h1>HOME</h1>
                <div className={estilos.listaProf}>
                    <h2>LISTA DE PROFESSORES</h2>
                    <div className={estilos.elementos}>
                        <table className={estilos.table}>
                            <thead>
                                <tr className={estilos.tr}>
                                    <th>OPÇÕES</th>
                                    <th>ID</th>
                                    <th>NI</th>
                                    <th>NOME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((professor)=>(
                                    <tr>
                                        <td className={estilos.td}><FaEdit className={estilos.edit}/> <FaTrash className={estilos.delete}/></td>
                                        <td className={estilos.td}><span className={estilos.id}>{professor.id}</span></td>
                                        <td className={estilos.td}><span className={estilos.ni}>{professor.ni}</span></td>
                                        <td className={estilos.td}><span className={estilos.nome}>{professor.nome}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </div>
        </main>
    )
}