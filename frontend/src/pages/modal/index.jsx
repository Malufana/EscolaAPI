import React, { useState, useEffect, useRef } from "react";
import estilos from '../modal/style.module.css'
import axios from "axios";
import useWindowSize from "../../functions/useWindowSize";

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    criar,
    // atualizar
    setar,
    setSetar,
})=>{

    if (!isOpen) return null

    console.log("Prof Select: ", professorSelecionado)

    const [id, setId] = useState(professorSelecionado?.id || "")
    const [ni, setNi] = useState(professorSelecionado?.ni || "")
    const [nome, setNome] = useState(professorSelecionado?.nome || "")
    const [email, setEmail] = useState(professorSelecionado?.email || "")
    const [cel, setCel] = useState(professorSelecionado?.cel || "")
    const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")
    const [foto, setFoto] = useState(professorSelecionado?.foto || "")

    const [preview, setPreview] = useState(null)
    const fotoRef = useRef(null)
    const [mensagem, setMensagem] = useState('')
    const token = localStorage.getItem('token')

    const {width, height} = useWindowSize();

    useEffect(() =>{
        if(professorSelecionado){
            setId(professorSelecionado.id || "")
            setNi(professorSelecionado.ni || "")
            setNome(professorSelecionado.nome || "")
            setEmail(professorSelecionado.email || "")
            setCel(professorSelecionado.cel || "")
            setOcup(professorSelecionado.ocup || "")
            setFoto(professorSelecionado.foto || "")
            //capturar foto
        }
        else{
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
            setFoto('')
        }
    }, [professorSelecionado])


    console.log("Professor Selecionado: ", professorSelecionado);


    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!ni || !nome || !email || !cel || !ocup || !(fotoRef.current instanceof File)){
            setMensagem("Preencha todos os campos!")
            return
        }

        const fileExtension = fotoRef.current.name.split(".").pop()
        const newNameFile = `${ni}_${nome.split(" ")[0]}.${fileExtension}`
        const nameFile = new File([fotoRef.current], newNameFile, {type: fotoRef.current.type})

        const formData = new formData()
        formData.append("ni", ni)
        formData.append("nome", nome)
        formData.append("email", email)
        formData.append("cel", cel)
        formData.append("ocup", ocup)
        formData.append("foto", nameFile)

        try{
            await axios.post('http://127.0.0.1:8000/api/professores',
                formData, 
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            setMensagem("Dados enviados com sucesso!")
            console.log("Dados enviados com sucesso!")
            setPreview(null)
            onClose(true)

        }catch(error){
            console.error("Erro ao enviar dados: ", error)
        }

    }

    const deleteFile = async (fileName) =>{
        if(fotoRef){
            const response = await axios.delete(`http://127.0.0.1:8000/api/deleteFile/${fileName}`,
                {
                    headers:{
                        Authorization: `Berear ${token}`
                    }
                }
            )
            console.log("Deletou")
        }
    }

    const handleFileChange = (e) =>{
        if(professorSelecionado){
            const fileName = professorSelecionado.foto.split("/").pop()
            deleteFile(fileName)
        }
        const file = e.target.file[0]

        if(!file) return

        fotoRef.current = file

        const reader = new FileReader()
        reader.onloadend = () =>{
            setPreview("Preview: ", file)
        } 

        reader.readAsDataURL(file)
        console.log("Preview XXX: ", file)


    }

    const atualizar = async (id) =>{
        if(!professorSelecionado) return;

        console.log("Professor selecionado para atualizar: ", professorSelecionado);

        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/professores/${professorSelecionado.id}/`,
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    ocup: ocup,
                    cel: cel,
                    foto: foto 
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
        <main className={estilos.overlay}>
            <div className={estilos.container_modal}>
                <div className={estilos.body_modal}>
                    <button onClick={onClose} className={estilos.close_button}>X</button>

                    <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>

                    <div className={estilos.form_modal}>
                        <div className={estilos.caixa}>
                            
                            <input 
                                type="text" 
                                name="ni"
                                id="ni"
                                className={estilos.input}
                                placeholder="NI"
                                value={ni}
                                onChange={(e) =>setNi(e.target.value)}
                            />

                            <input 
                                type="text" 
                                name="nome"
                                id="nome"
                                className={estilos.input}
                                placeholder="NOME"
                                value={nome}
                                onChange={(e) =>setNome(e.target.value)}
                            />

                            <input 
                                type="email" 
                                name="email"
                                id="email"
                                className={estilos.input}
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                            />

                            <input 
                                type="text" 
                                name="cel"
                                id="cel"
                                className={estilos.input}
                                placeholder="CELULAR"
                                value={cel}
                                onChange={(e) =>setCel(e.target.value)}
                            />

                            <input 
                                type="text" 
                                name="ocup"
                                id="ocup"
                                className={estilos.input}
                                placeholder="OCUPAÇÃO"
                                value={ocup}
                                onChange={(e) =>setOcup(e.target.value)}
                            />

                            <div className={estilos.blocoImg}>
                                <div className={estilos.imageContainer}>
                                    <img 
                                        src={`http://127.0.0.1:8000/api/fotos/${ni}_${nome.split(" ")[0]}.png`} 
                                        className={estilos.imagem}
                                    />
                                </div>

                                <div className={estilos.imageForm}>
                                    <form onSubmit={handleSubmit} className={estilos.form}>
                                        {preview && <img src={preview} className={estilos.preview}/>}

                                        <input type="file" accept="image/*" onChange={handleFileChange} className={estilos.customFileInput}/>

                                        <button 
                                            className={estilos.btn}
                                            type="submit"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                professorSelecionado ? atualizar(professorSelecionado.id) : handleSubmit(e)
                                            }}
                                        >
                                            {professorSelecionado ? "Atualizar" : "Salvar"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}

export default ModalProfessores