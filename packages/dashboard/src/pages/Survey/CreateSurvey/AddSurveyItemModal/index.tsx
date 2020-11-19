import React, { useState, SyntheticEvent, MouseEvent, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    InputLabel,
    FormControl,
    FormControlLabel,
    Switch,
    Select,
    TextField,
    Snackbar,
    MenuItem,
    AppBar,
    Toolbar,
    Typography
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
    const [currentDataTypeObject, setCurrentDataTypeObject] = useState<DataType | null>(null);

    const [message, setMessage] = useState<string | null>(null);

    const classes = useStyles();

    useEffect(() => {
        const type = dataTypes.filter((dt) => dt.id === currentDataType);
        if (type.length !== 1) {
            setCurrentDataTypeObject(null);
            return;
        }
        setCurrentDataTypeObject(type[0]);
    }, [currentDataType]);

    const steps = [
        'Selecione o tipo de dado',
        'Configurações',
        'Concluir'
    ];

    function handleChangeDataType(event: React.ChangeEvent<{ value: unknown }>) {
        setCurrentDataType(event.target.value as string);
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
        if (!currentDataTypeObject) {
            setMessage('Selecione o tipo de dado para o campo!');
            setActiveStep(0);
            return;
        }
        const schema = currentDataTypeObject.getSchema();
        schema.validate(data, {
            abortEarly: false
        }).then((validated) => {
            setActiveStep(2);
        }).catch((error) => {
            setMessage('Ops! Preencha os campos corretamente!');
        });
    }

    function renderStepperControls () {
        return (
            <div>
                <div>
                    {activeStep !== 0 && (
                        <Button
                            onClick={handleBack}
                        >
                            Voltar
                        </Button>
                    )}
                    {activeStep === 1 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Avançar
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Criar' : 'Avançar'}
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    function getStepContent(index: number) {
        if (index === 0) {
            return (
                <>
                    <Typography>Aqui você deve selecionar o tipo do dado que o campo irá coletar.</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-label"
                        >
                            Tipo de dado
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentDataType}
                            onChange={handleChangeDataType}
                        >
                            {dataTypes.map((item) => (
                                <MenuItem value={item.id}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            );
        } else if (index === 1) {
            if (!currentDataTypeObject) {
                return;
            }
            return (
                <>
                    <Typography>Aqui você deve preencher as configurações do seu tipo de dado.</Typography>
                    <Form onSubmit={handleSubmit}>
                        {currentDataTypeObject.configurationPage()}
                        {renderStepperControls()}
                    </Form>
                </>
            );
        } else if (index === 2) {
            return (
                <>
                    <Typography>Aqui você deve preencher informações sobre a pergunta a ser realizada durante a pesquisa.</Typography>
                </>
            );
        }
        return null;
    }

    return (
        <>
            <Dialog onClose={close} open={opened} fullScreen>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.appBarTitle}>
                            Adicionar Campo
                        </Typography>
                        <Button color="inherit" onClick={close}>
                            Cancelar
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogTitle>Preencha corretamente todas as etapas abaixo para adicionar um novo campo para a pesquisa.</DialogTitle>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                {activeStep !== 1 && renderStepperControls()}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
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
        </>
    );
};

export default AddSurveyItemModal;
