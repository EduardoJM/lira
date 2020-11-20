import React, {
    useState,
    SyntheticEvent,
    MouseEvent,
    useEffect,
    ChangeEvent,
} from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    InputLabel,
    FormControl,
    TextField,
    Select,
    Snackbar,
    MenuItem,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { SurveyItemDataType, SurveyItem } from '@lira/survey';

import useStyles from './material';
import { dataTypes, DataType } from '../survey';
import { useSurveyItems } from '../../../../contexts/surveyItems';

/**
 * Add Survey Item modal properties.
 */
interface AddSurveyItemModalProps {
    /**
     * A boolean value indicating if the modal is opened.
     */
    opened: boolean;
    /**
     * A function called when modal needs to be closed.
     */
    close: () => void;
}

/**
 * Add Survey Item Modal.
 * @param props Modal Properties.
 */
const AddSurveyItemModal: React.FC<AddSurveyItemModalProps> = (props) => {
    const {
        opened,
        close,
    } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [currentDataType, setCurrentDataType] = useState('');
    const [currentDataTypeObject, setCurrentDataTypeObject] = useState<DataType | null>(null);
    const [storedDataType, setStoredDataType] = useState<SurveyItemDataType<any> | null>(null);
    const [questionText, setQuestionText] = useState('');

    const { items, setItems } = useSurveyItems();

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
        'Descrição',
        'Concluir',
    ];

    function handleChangeDataType(event: React.ChangeEvent<{ value: unknown }>) {
        setCurrentDataType(event.target.value as string);
    }

    function handleNext() {
        if (activeStep === steps.length - 1) {
            // finish
            if (!storedDataType || questionText === '') {
                setMessage('Ops! houve um erro com seus dados!');
                setActiveStep(0);
                return;
            }
            const item = new SurveyItem(storedDataType, questionText);
            setItems([
                ...items,
                item,
            ]);
            close();
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

    const handleSubmit: SubmitHandler<any> = (data) => {
        if (!currentDataTypeObject) {
            setMessage('Selecione o tipo de dado para o campo!');
            setActiveStep(0);
            return;
        }
        const schema = currentDataTypeObject.getSchema();
        schema.validate(data, {
            abortEarly: false,
        }).then((validated) => {
            const dt = currentDataTypeObject.create(validated);
            setStoredDataType(dt);
            setActiveStep(2);
        }).catch(() => {
            setMessage('Ops! Preencha os campos corretamente!');
            setStoredDataType(null);
        });
    };

    function handleQuestionTextChange(e: ChangeEvent<HTMLInputElement>) {
        setQuestionText(e.target.value);
    }

    function renderStepperControls() {
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
                    <Typography>
                        Aqui você deve selecionar o tipo do dado que o campo irá coletar.
                    </Typography>
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
        }
        if (index === 1) {
            if (!currentDataTypeObject) {
                return null;
            }
            return (
                <>
                    <Typography>
                        Aqui você deve preencher as configurações do seu tipo de dado.
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        {currentDataTypeObject.configurationPage()}
                        {renderStepperControls()}
                    </Form>
                </>
            );
        }
        if (index === 2) {
            return (
                <>
                    <Typography>
                        Aqui você deve preencher informações sobre a pergunta a ser
                        realizada durante a pesquisa.
                    </Typography>
                    <TextField
                        id="item-text"
                        label="Texto da Pergunta"
                        multiline
                        rowsMax={4}
                        value={questionText}
                        onChange={handleQuestionTextChange}
                    />
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
                <DialogTitle>
                    Preencha corretamente todas as etapas
                    abaixo para adicionar um novo campo para a pesquisa.
                </DialogTitle>
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
