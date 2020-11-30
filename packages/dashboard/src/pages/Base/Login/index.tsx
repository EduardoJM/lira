import React, { useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import { ShortTextField } from '../../../components/Forms';
import { useAuth } from '../../../contexts/auth';

import useStyles from './material';

const Login: React.FC = () => {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();

    const handleSubmit = (data: { email: string; password: string }) => {
        auth.signIn(data.email, data.password);
    };

    useEffect(() => {
        if (auth.signed) {
            history.push('/');
        }
    }, [auth.signed]);

    return (
        <div className={classes.container}>
            <Paper className={classes.box}>
                <Typography className={classes.boxTitle} variant="h5">Faça Login</Typography>
                <Form
                    className={classes.boxForm}
                    onSubmit={handleSubmit}
                >
                    <ShortTextField
                        name="email"
                        label="E-mail"
                        className={classes.input}
                    />
                    <ShortTextField
                        name="password"
                        label="Senha"
                        type="password"
                        className={classes.input}
                    />
                    <div className={classes.formSubmitRow}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Entrar
                        </Button>
                    </div>
                </Form>
            </Paper>
        </div>
    );
};

export default Login;
