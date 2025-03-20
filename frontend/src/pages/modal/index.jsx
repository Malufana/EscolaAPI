import React, {useState, useEffect} from "react";
import estilos from '../modal/style.module.css'
import axios from "axios";

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    criar,
    // atualizar
    setar,
    setSetar
})=>{

    if (!isOpen) return null

    console.log("Prof Select: ", professorSelecionado)

    const [id, setId] = useState(professorSelecionado?.id || "")
    const [ni, setNi] = useState(professorSelecionado?.ni || "")
    const [nome, setNome] = useState(professorSelecionado?.nome || "")
    const [email, setEmail] = useState(professorSelecionado?.email || "")
    const [cel, setCel] = useState(professorSelecionado?.cel || "")
    const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")
    const token = localStorage.getItem('token')

    useEffect(() =>{
        if(professorSelecionado){
            setId(professorSelecionado.id || "")
            setNi(professorSelecionado.ni || "")
            setNome(professorSelecionado.nome || "")
            setEmail(professorSelecionado.email || "")
            setCel(professorSelecionado.cel || "")
            setOcup(professorSelecionado.ocup || "")
        }
        else{
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
        }
    }, [professorSelecionado])


    console.log("Professor Selecionado: ", professorSelecionado);


    const handleSubmit = (e) =>{
        e.preventDefault()

        const novoProfessor = {ni, nome, email, cel, ocup}
        console.log("Novo Professor1: ", novoProfessor);

        if(professorSelecionado){
            atualizar()
        }else{
            criar(novoProfessor)
            console.log("Dados enviados: ", novoProfessor);
        }
    }

    const atualizar = async () =>{
        if(!professorSelecionado) return;

        console.log("Professor selecionado para atualizar: ", professorSelecionado);

        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/professores/${professorSelecionado.id}/`,
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    ocup: ocup,
                    cel: cel
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Professor atualizado com sucesso!", response.data);

            setSetar(!setar);
            onClose();
            
        }catch(error){
            console.error("Erro ao atualizar professor: ", error);
        }
    }

    return(
        <main>
            <div className={estilos.container_modal}>
                <div className={estilos.body_modal}>
                    <button onClick={onClose} className={estilos.close_button}>X</button>
                    <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>
                    <div className={estilos.form_modal}>
                        <div className={estilos.caixa}>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    name="ni"
                                    id="ni"
                                    className={estilos.niModal}
                                    placeholder="NI"
                                    value={ni}
                                    onChange={(e) =>setNi(e.target.value)}
                                />

                                <input 
                                    type="text" 
                                    name="nome"
                                    id="nome"
                                    className={estilos.nomeModal}
                                    placeholder="NOME"
                                    value={nome}
                                    onChange={(e) =>setNome(e.target.value)}
                                />

                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    className={estilos.emailModal}
                                    placeholder="EMAIL"
                                    value={email}
                                    onChange={(e) =>setEmail(e.target.value)}
                                />

                                <input 
                                    type="text" 
                                    name="cel"
                                    id="cel"
                                    className={estilos.celModal}
                                    placeholder="CELULAR"
                                    value={cel}
                                    onChange={(e) =>setCel(e.target.value)}
                                />

                                <input 
                                    type="text" 
                                    name="ocup"
                                    id="ocup"
                                    className={estilos.ocupModal}
                                    placeholder="OCUPAÇÃO"
                                    value={ocup}
                                    onChange={(e) =>setOcup(e.target.value)}
                                />

                                <button type="submit">{professorSelecionado ? "Atualizar" : "Salvar"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}

export default ModalProfessores