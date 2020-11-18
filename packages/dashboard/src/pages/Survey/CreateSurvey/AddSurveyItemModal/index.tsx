import React, { useState, SyntheticEvent, MouseEvent } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    InputLabel,
    FormControl,
    FormControlLabel,
    Switch,
    Select,
    TextField,
    Snackbar,
    MenuItem,
} from '@material-ui/core';
import { Scope, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

import useStyles from './material';
import { dataTypes, DataType } from '../survey';


import { Form } from '@unform/web';

interface AddSurveyItemModalProps {
    opened: boolean;
    close: () => void;
}

interface FormData {
    field: any;
};

const AddSurveyItemModal: React.FC<AddSurveyItemModalProps> = (props) => {
    const {
        opened,
        close
    } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [currentDataType, setCurrentDataType] = useState('');

    const [message, setMessage] = useState<string | null>(null);

    const classes = useStyles();

    const steps = [
        'Selecione o tipo de dado',
        'Configurações',
        'Concluir'
    ];

    function handleChangeDataType(event: React.ChangeEvent<{ value: unknown }>) {
        setCurrentDataType(event.target.value as string);
    }

    function getStepContent(stepIndex: number): React.ReactNode {
        if (stepIndex === 0) {
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Tipo de dado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentDataType}
                        onChange={handleChangeDataType}
                    >
                        {dataTypes.map((item) => (
                            <MenuItem value={item.id}>{item.text}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        } else if (stepIndex === 1) {
            const type = dataTypes.filter((dt) => dt.id === currentDataType);
            if (type.length !== 1) {
                setMessage('Selecione o tipo de dado para o campo');
                setActiveStep(0);
                return null;
            }
            return (
                <Scope path="field">
                    {type[0].configurationPage()}
                </Scope>
            );
        } else if (stepIndex === 2) {
            return (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Criar Campo
                    </Button>
                </Box>
            );
        }
        return null;
    }

    function handleNext() {
        if (activeStep === steps.length - 1) {
            return;
        }
        if (activeStep === 0) {
            const type = dataTypes.filter((dt) => dt.id === currentDataType);
            if (type.length !== 1) {
                setMessage('Selecione o tipo de dado para o campo!');
                return;
            }
        } else if (activeStep === 1) {
            const type = dataTypes.filter((dt) => dt.id === currentDataType);
            if (type.length !== 1) {
                setMessage('Selecione o tipo de dado para o campo!');
                setActiveStep(0);
                return;
            }
        }
        setActiveStep(activeStep + 1);
    }

    function handleBack() {
        if (activeStep === 0) {
            return;
        }
        setActiveStep(activeStep - 1);
    }

    function handleSnackbarClose(event: SyntheticEvent | MouseEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(null);
    }

    const handleSubmit: SubmitHandler<FormData> = (data) => {
        const type = dataTypes.filter((dt) => dt.id === currentDataType);
        if (type.length !== 1) {
            setMessage('Selecione o tipo de dado para o campo!');
            setActiveStep(0);
            return;
        }
        const schema = Yup.object({
            field: type[0].getSchema()
        });
        schema.validate(data, {
            abortEarly: false
        }).then((validated) => console.log(validated)).catch((error) => {
            console.log(error);
        });
    }

    return (<>
        <Dialog onClose={close} open={opened}>
            <DialogTitle>Adicionar Novo Campo</DialogTitle>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Form onSubmit={handleSubmit}>
                <Box className={classes.content}>
                    {getStepContent(activeStep)}
                </Box>
                <Box className={classes.footer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                    >
                        Avançar
                    </Button>
                </Box>
            </Form>
        </Dialog>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={message !== null}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message={message}
        />
    </>);
};

export default AddSurveyItemModal;
