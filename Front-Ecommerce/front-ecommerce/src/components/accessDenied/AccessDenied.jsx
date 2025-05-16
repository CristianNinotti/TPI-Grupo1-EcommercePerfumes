import { useNavigate } from 'react-router-dom';
import { playOpenSound, playCloseSound } from '../sounds/Sounds';

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className='m-10'>
            <h1>Acceso denegado</h1><br />
            <p>Lo sentimos, no tienes permiso para acceder a esta página.</p><br />
            <p>Si crees que esto es un error, por favor contacta al administrador.</p><br />
            <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate('/')}} className='cursor-pointer underline'>Click aqui para volver al inicio</p>
        </div>
    );
}

export default AccessDenied;