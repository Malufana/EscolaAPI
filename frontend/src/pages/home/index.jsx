import axios from "axios";
import stylo from './styles.module.css'
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FaUserTie, FaBook } from "react-icons/fa";

export default function Home(){
    

    


    return(
        <div className={stylo.container}>
            <Header/>
            <div className={stylo.princ}>
                <a href="/professores" className={stylo.card}>
                    <FaUserTie className={stylo.icon}/>
                    <span>Professores</span>
                </a>

                <a href="/disciplinas" className={stylo.card}>
                    <FaBook className={stylo.icon}/>
                    <span>Disciplinas</span>
                </a>

            </div>
            <Footer/>
        </div>
    )
}