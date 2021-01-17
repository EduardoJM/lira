import React, {
    useContext,
    useState,
    useEffect,
    createContext,
} from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import api from '@lira/axios-config';
import { texts } from '../data';

type SignedState = 'Loading' | 'Signed' | 'Unsigned';

interface AuthContextData {
    signed: SignedState;
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
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<SignedState>('Loading');
    const history = useHistory();

    function signIn(email: string, password: string) {
        const signInData = {
            email,
            password,
        };
        api.post<LoginResult>('/auth', signInData).then((result) => {
            setUser(result.data.user);
            api.defaults.headers.Authorization = `Bearer ${result.data.token}`;
            localStorage.setItem('@LiraAuth:user', JSON.stringify(result.data.user));
            localStorage.setItem('@LiraAuth:token', result.data.token);
            history.push('/');
        }).catch((error) => {
            if (error.response) {
                if (error.response.data
                    && error.response.data.error
                    && error.response.data.information) {
                    if (Object.prototype.hasOwnProperty.call(
                        texts,
                        error.response.data.information
                    )) {
                        setError((texts as any)[error.response.data.information]);
                    } else {
                        setError(texts.UNKNOWN_ERROR);
                    }
                }
            } else if (error.request) {
                setError(texts.UNKNOWN_ERROR);
            } else {
                setError(error.message);
            }
        });
    }

    function signOut() {
        setUser(null);
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        history.push('/sign-in');
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem('@LiraAuth:user');
        const storagedToken = localStorage.getItem('@LiraAuth:token');
        if (storagedUser && storagedToken) {
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            setUser(JSON.parse(storagedUser));
            setState('Signed');
        } else {
            setState('Unsigned');
        }
    }, []);

    function handleCloseSnackbar() {
        setError(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: state,
            user: user || {},
            signIn,
            signOut,
        }}
        >
            {children}
            <Snackbar
                open={error !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    elevation={6}
                    variant='filled'
                    onClose={handleCloseSnackbar}
                    severity='error'
                >
                    {error !== null ? error : ''}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}
