import estilos from './Header.module.css';

export function Header(){
    return(
        <header className={estilos.header}>
            <div className={estilos.logo}>
                <a href="/home">PROFESSORES</a>
            </div>

            <button className={estilos.button}>
                CREATE
            </button>

            <button className={estilos.button}>
                READ
            </button>
            
            <button className={estilos.button}>
                UPDATE
            </button>

            <button className={estilos.button}>
                DELETE
            </button>
        </header>
    )
} 