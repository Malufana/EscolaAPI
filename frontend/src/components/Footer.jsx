import estilos from './Footer.module.css';
import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export function Footer(){
    return(
        <footer className={estilos.footer}>
             
            <div className={estilos.footer_container}>
                
                {/* Informações da escola */}
                <section className={estilos.school_info}>
                    <h3>Escola SENAI Roberto Mange</h3>
                    <p>Formando profissionais para o futuro.</p>
                    <p><strong>Endereço:</strong> Rua Pastor Cícero Canuto de Lima, 71 - Campinas, SP</p>
                    <p><strong>Contato:</strong> (19) 3772-1840 | contato@senai.com.br</p>
                </section>

                {/* Redes sociais */}
                <section className={estilos.social_media}>
                    <h4>Redes Sociais</h4>
                    <div className={estilos.social_icons}>
                        <a href="https://facebook.com/senairobertomange" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={24} color="black" />
                        </a>

                        <a href="https://instagram.com/senairobertomange" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} color="black" />
                        </a>

                        <a href="https://linkedin.com/senairobertomange" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={24} color="black" />
                        </a>
                    </div>
                </section>
                
            </div>

            {/* Direitos autorais */}
            <div className={estilos.footer_bottom}>
                <p>&copy; 2025 SENAI Roberto Mange. Todos os direitos reservados.</p>
            </div>
                
        </footer>
    )
}
