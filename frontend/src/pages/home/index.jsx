import React, { useState, useEffect } from "react";
import axios from 'axios';
import estilos from './styles.module.css'
import {FaEdit, FaTrash, FaSearch, FaPlus} from "react-icons/fa";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ModalProfessores from "../modal";

export default function Home(){
    const [dados, setDados] = useState([])
    const token = localStorage.getItem("token") || "";
    console.log("Token Home: ", token);
    const [modalOpen, setModalOpen] = useState(false)
    const [professorSelecionado, setProfessorSelecionado] = useState(null)
    const [setar, setSetar] = useState(false)


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

    const editar = (professor) =>{
        console.log(professor)
        setProfessorSelecionado(professor)
        setModalOpen(true)
    }

    const criar = async (novoProfessor) =>{

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoProfessor])
            setModalOpen(false)
            setSetar(!setar)
        }catch(error){

        }
    }

    const atualizar = () =>{
        
    }

    return(
        <main>
            <div className={estilos.container_home}>
                <Header/>
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
                                    <th>EMAIL</th>
                                    <th>CELULAR</th>
                                    <th>OCUPAÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((professor)=>(
                                    <tr>
                                        <td className={estilos.td}><FaEdit className={estilos.edit} onClick={() => editar(professor)}/> <FaTrash className={estilos.delete}/></td>
                                        <td className={estilos.td}><span>{professor.id}</span></td>
                                        <td className={estilos.td}><span>{professor.ni}</span></td>
                                        <td className={estilos.td}><span>{professor.nome}</span></td>
                                        <td className={estilos.td}><span>{professor.email}</span></td>
                                        <td className={estilos.td}><span>{professor.cel}</span></td>
                                        <td className={estilos.td}><span>{professor.ocup}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={estilos.footer_table}>
                                <div className={estilos.btn1}>
                                    <FaPlus 
                                        className={estilos.adicionar}
                                        onClick={() => (
                                            setProfessorSelecionado(null),
                                            setModalOpen(true)
                                        )}
                                    />
                                </div>

                                <div className={estilos.pesquisar}>
                                    <input type="text" placeholder="ID" />
                                </div>

                                <div className={estilos.btn2}>
                                    <FaSearch className={estilos.procurar}/>
                                </div>
                        </div>
                    </div>
                </div>
                <ModalProfessores
                    isOpen={modalOpen}
                    onClose={() => modalOpen(false)}
                    professorSelecionado={professorSelecionado}
                    setProfessorSelecionado={setProfessorSelecionado}
                    criar={criar}
                    atualizar={atualizar}
                />
                <Footer/>
            </div>
        </main>
    )
}