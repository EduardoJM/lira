import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DashBoard from '../../../layouts/DashBoard';

import { useAuth } from '../../../contexts/auth';

const Profile: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (auth.signed === 'Unsigned') {
            history.push('/');
        }
    }, [auth.signed]);

    console.log(auth.user);

    return (
        <DashBoard
            title="Perfil"
        >
            <>
                {auth.signed === 'Signed' && auth.user && (
                    <h1>{auth.user[0].displayName}</h1>
                )}
            </>
        </DashBoard>
    );
};

export default Profile;
