import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </div>
    );
}

export default Loading;
