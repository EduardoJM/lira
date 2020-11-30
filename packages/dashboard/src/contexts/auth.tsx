import React, {
    useContext,
    useState,
    useEffect,
    createContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import api from '@lira/axios-config';

interface AuthContextData {
    signed: boolean;
    user: object;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface LoginResult {
    user: object;
    token: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const history = useHistory();

    async function signIn(email: string, password: string) {
        const signInData = {
            email,
            password,
        };
        const result = await api.post<LoginResult>('/auth', signInData);
        setUser(result.data.user);
        api.defaults.headers.Authorization = `Bearer ${result.data.token}`;
        localStorage.setItem('@LiraAuth:user', JSON.stringify(result.data.user));
        localStorage.setItem('@LiraAuth:token', result.data.token);
        history.push('/');
    }

    async function signOut() {
        setUser(null);
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        history.push('/in');
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem('@LiraAuth:user');
        const storagedToken = localStorage.getItem('@LiraAuth:token');
        if (storagedUser && storagedToken) {
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            setUser(JSON.parse(storagedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user: user || {},
            signIn,
            signOut,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
