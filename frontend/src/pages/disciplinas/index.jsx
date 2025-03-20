import React, { useEffect, useState } from "react";
import axios from "axios";
import est from './styles.module.css'
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import ModalDisciplinas from "../modal/indexDisc";

export default function Disciplinas(){
    const [dados, setDados] = useState([]);
    const token = localStorage.getItem("token");
    console.log("Token Disciplinas: ", token);
    const [modalOpen, setModalOpen] = useState(false);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

    const [setar, setSetar] = useState(false);
    
    useEffect(() => {
        if(!token){
            console.warn("Nenhum token encontrado!");
            return;
        }

        const fetchData = async () =>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/disc/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)

            }catch(error){
                console.error(error)
            }
        }
        fetchData();
    }, [token, setar]);

    const editar = (disciplina) => {
        console.log(disciplina);
        setDisciplinaSelecionada(disciplina);
        setModalOpen(true);
    }

    const criar = async (novaDisciplina) =>{
        console.log("Nova disciplina recebida", novaDisciplina);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas/',
                {
                    codigo: novaDisciplina.codigo,
                    nome: novaDisciplina.nome,
                    qtdAula: novaDisciplina.qtdAula
                },{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data);
            setDados([...dados, novaDisciplina]);
            setModalOpen(false)
            setSetar(!setar)
        }catch(error){
            console.error("Erro ao criar disciplina: ", error.response?.data || error);
        }
    }

    const apagar = async (disciplina) =>{
        console.log("Disciplina: ", disciplina);

        try{
            await axios.delete(`http://127.0.0.1:8000/api/disciplinaAula/${disciplina.id}/`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados apagados com sucesso!");
            setSetar(!setar)
        }catch(error){
            console.log("Erro ao apagar disciplina: ", error.response ? error.response.data : error.message);
        }
    }

    
    return(
        <main>
            <div className={est.container_disc}>
                <Header/>
                <div className={est.listaDisc}>
                    <h2>LISTA DE DISCIPLINAS</h2>
                    <div className={est.elementoDisc}>
                        <table className={est.tableDisc}>
                            <thead>
                                <tr className={est.trDisc}>
                                    <th className={est.thDisc}>OPÇÕES</th>
                                    <th className={est.thDisc}>ID</th>
                                    <th className={est.thDisc}>CODIGO</th>
                                    <th className={est.thDisc}>DISCIPLINA</th>
                                    <th className={est.thDisc}>QTD. DE AULA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((disciplina) => (
                                    <tr className={est.trDisc}>
                                        <td className={est.tdDisc}><FaEdit className={est.edit} onClick={() => editar(disciplina)}/> <FaTrash onClick={() => apagar(disciplina)} className={est.delete}/></td>
                                        <td className={est.tdDisc}><span>{disciplina.id}</span></td>
                                        <td className={est.tdDisc}><span>{disciplina.codigo}</span></td>
                                        <td className={est.tdDisc}><span>{disciplina.nome}</span></td>
                                        <td className={est.tdDisc}><span>{disciplina.qtdAula}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={est.footer_table}>
                                <div className={est.btn1}>
                                    <FaPlus
                                        className={est.adicionar}
                                        onClick={() => (
                                            setDisciplinaSelecionada(null),
                                            setModalOpen(true)
                                        )}
                                    />
                                </div>

                                <div className={est.pesquisar}>
                                    <input type="text" placeholder="ID"/>
                                </div>

                                <div className={est.btn2}>
                                    <FaSearch className={est.procurar}/>
                                </div>
                        </div>
                    </div>
                </div>

                <ModalDisciplinas
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    disciplinaSelecionada={disciplinaSelecionada}
                    setDisciplinaSelecionada={setDisciplinaSelecionada}
                    criar={criar}
                    setar={setar}
                    setSetar={setSetar}
                    setModalOpen={setModalOpen}
                />
                <Footer/>
            </div>
        </main>
    )

}