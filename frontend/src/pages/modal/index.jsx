import React, {useState, useEffect} from "react";
import estilos from '../modal/style.module.css'

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    criar,
    atualizar
})=>{

if (!isOpen) return null

console.log("Prof Select: ", professorSelecionado)

const [id, setId] = useState(professorSelecionado?.id || "")
const [ni, setNi] = useState(professorSelecionado?.ni || "")
const [nome, setNome] = useState(professorSelecionado?.nome || "")
const [email, setEmail] = useState(professorSelecionado?.email || "")
const [cel, setCel] = useState(professorSelecionado?.cel || "")
const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")

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
}, [])

const handleSubmit = (e) =>{
    e.preventDefault()

    const novoProfessor = {ni, nome, email, cel, ocup}

    if(professorSelecionado){
        atualizar({...professorSelecionado})
    }else{
        criar(novoProfessor)
    }
}

return(
    <main>
        <div className={estilos.container_modal}>
            <div className={estilos.body_modal}>
                <button onClose={fecharModal} className={estilos.close_button}>X</button>
                <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>
                <div className={estilos.form_modal}>
                    <div className={estilos.caixa}>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                className={estilos.niModal}
                                placeholder="NI"
                                value={ni}
                                onChange={(e) =>setNi(e.target.value)}
                            />

                            <input 
                                type="text" 
                                className={estilos.nomeModal}
                                placeholder="NOME"
                                value={nome}
                                onChange={(e) =>setNome(e.target.value)}
                            />

                            <input 
                                type="email" 
                                className={estilos.emailModal}
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                            />

                            <input 
                                type="text" 
                                className={estilos.celModal}
                                placeholder="CELULAR"
                                value={cel}
                                onChange={(e) =>setCel(e.target.value)}
                            />

                            <input 
                                type="text" 
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