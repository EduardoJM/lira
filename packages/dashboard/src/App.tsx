import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import api from '@lira/axios-config';

import { AuthProvider } from './contexts/auth';

import { Loading, Login, NoServer } from './pages';

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

    return (
        <AuthProvider>
            <BrowserRouter>
                <Route path="/in" exact><Login /></Route>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
