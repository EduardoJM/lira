import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { Form } from '@unform/web';

import { ShortTextField } from '../../../components/Forms';

import useStyles from './material';

const Login: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper className={classes.box}>
                <Typography className={classes.boxTitle} variant="h5">Faça Login</Typography>
                <Form
                    className={classes.boxForm}
                    onSubmit={(data) => console.log(data)}
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
