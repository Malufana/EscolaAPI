import React, { useEffect, useState } from "react";
import estilos from '../modal/style.module.css'
import axios from "axios";

const ModalDisciplinas = ({
    isOpen,
    onClose,
    disciplinaSelecionada,
    criar,
    setar,
    setSetar
}) => {

    if(!isOpen) return null

    console.log("Disc Selecionada: ", disciplinaSelecionada);

    const [id, setId] = useState(disciplinaSelecionada?.id || "");
    const [codigo, setCodigo] = useState(disciplinaSelecionada?.codigo || "");
    const [nome, setNome] = useState(disciplinaSelecionada?.nome || "");
    const [qtdAula, setQtdAula] = useState(disciplinaSelecionada?.qtdAula || "");
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(disciplinaSelecionada){
            setId(disciplinaSelecionada.id || "");
            setCodigo(disciplinaSelecionada.codigo || "");
            setNome(disciplinaSelecionada.nome || "");
            setQtdAula(disciplinaSelecionada.qtdAula || "");
        }else{
            setId('');
            setCodigo('');
            setNome('');
            setQtdAula('');
        }
    }, [disciplinaSelecionada])

    console.log("Disciplina Selecionada: ", disciplinaSelecionada);

    const handleSubmit = (e) => {
        e.preventDefault()

        const novaDisciplina = { codigo, nome, qtdAula }
        console.log("Nova Disciplina: ", novaDisciplina);

        if(disciplinaSelecionada){
            atualizar()
        }else{
            criar(novaDisciplina)
            console.log("Dados enviados: ", novaDisciplina);
        }
    }

    const atualizar = async () =>{
        if(!disciplinaSelecionada) return;

        console.log("Disciplina selecionada para atualizar: ", disciplinaSelecionada);

        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplinaAula/${disciplinaSelecionada.id}/`,
                {
                    codigo: codigo,
                    nome: nome,
                    qtdAula: qtdAula
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Disciplina atualizada com sucesso!", response.data);

            setSetar(!setar);
            onClose();
        }catch(error){
            console.error("Erro ao atualizar disciplina: ", error);
        }
    }

    return(
        <main>
            <div className={estilos.container_modal}>
                <div className={estilos.body_modal}>
                    <button onClick={onClose} className={estilos.close_button}>X</button>
                    <h2>{disciplinaSelecionada ? "Editar" : "Cadastrar"}</h2>
                    <div className={estilos.form_modal}>
                        <div className={estilos.caixa}>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    name="codigo"
                                    id="codigo"
                                    className={estilos.nomeModal}
                                    placeholder="CODIGO"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />

                                <input 
                                    type="text" 
                                    name="nome"
                                    id="nome"
                                    className={estilos.nomeModal}
                                    placeholder="NOME"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <input 
                                    type="text" 
                                    name="qtdAula"
                                    id="qtdAula"
                                    className={estilos.nomeModal}
                                    placeholder="QTD DE AULA"
                                    value={qtdAula}
                                    onChange={(e) => setQtdAula(e.target.value)}
                                />

                                <button type="submit">{disciplinaSelecionada ? "Atualizar" : "Salvar"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ModalDisciplinas