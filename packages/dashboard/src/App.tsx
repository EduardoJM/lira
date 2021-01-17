import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import api from '@lira/axios-config';

import { AuthProvider, useAuth } from './contexts/auth';

import { Loading, Login, NoServer, CreateSurvey } from './pages';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [serverRunning, setServerRunning] = useState(false);

    useEffect(() => {
        api.get('/running').then((response) => {
            const data = response.data as { running: boolean; };
            if (data.running) {
                setServerRunning(true);
            }
            setLoading(false);
        }).catch(() => {
            setServerRunning(false);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }
    if (!serverRunning) {
        return <NoServer />;
    }

    const Logout: React.FC = () => {
        const { signOut } = useAuth();
        signOut();
        return <></>
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Route path="/sign-in" exact>
                    <Login />
                </Route>
                <Route path="/sign-out" exact>
                    <Logout />
                </Route>
                <Route path="/survey/new" exact>
                    <CreateSurvey />
                </Route>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
