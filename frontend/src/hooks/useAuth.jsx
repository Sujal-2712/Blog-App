import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAuth = () => {
    const { user } = useContext(AppContext);

    const isAuthenticated = () => {
        return user!==null;
    }

    return { isAuthenticated , user};
}

export default useAuth
