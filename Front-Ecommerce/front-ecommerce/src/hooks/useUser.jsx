import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUser = () => {
    const { user, logout } = useContext(AuthContext);

    return {
        user,
        logout
    };
};

export default useUser;
