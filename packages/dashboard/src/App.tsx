import React, { useEffect, useState } from 'react';
import api from '@lira/axios-config';

import { Loading, CreateSurvey, NoServer } from './pages';

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
        <CreateSurvey />
    );
};

export default App;
