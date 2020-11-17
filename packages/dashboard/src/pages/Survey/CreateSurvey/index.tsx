import React, { useState } from 'react';
import {
    Modal,
    Dialog,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    InputLabel,
    FormHelperText,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';
// import {} from '@lira/survey';

import { dataTypes, DataType } from './survey';

import useStyles from './material';

const CreateSurvey: React.FC = () => {
    const [modalAddOpened, setModalAddOpened] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    
    const [currentDataType, setCurrentDataType] = useState('');

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
                <div>
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
                </div>
            );
        }
        return null;
    }

    const classes = useStyles();

    function handleCloseModalAdd() {
        setModalAddOpened(false);
    }

    function handleOpenModalAdd() {
        setModalAddOpened(true);
    }

    return (
        <>
            <button type="button" onClick={handleOpenModalAdd}>
                Open Modal
            </button>
            <Dialog onClose={handleCloseModalAdd} open={modalAddOpened}>
                <DialogTitle>Adicionar Novo Campo</DialogTitle>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
            </Dialog>
        </>
    );
};

export default CreateSurvey;
