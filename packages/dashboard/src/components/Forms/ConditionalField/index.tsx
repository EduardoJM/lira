import React, {
    useState,
    useRef,
    useEffect,
    ChangeEvent,
} from 'react';
import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { useField } from '@unform/core';

interface ConditionalFieldProps {
    name: string;
    label: string;
    initialValue: boolean;
    field: React.ReactNode;
}

const ConditionalField: React.FC<ConditionalFieldProps> = (props) => {
    const {
        name,
        label,
        initialValue,
        field,
    } = props;
    const fieldRef = useRef(null);
    const [state, setState] = useState(initialValue);
    const { fieldName, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: fieldRef.current,
            getValue: () => state,
            setValue: (ref: any, check: boolean) => {
                setState(check);
            },
        });
    }, [fieldName, registerField, state]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setState(e.target.checked);
    }

    return (
        <>
            <Box>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={state}
                            onChange={handleChange}
                            name={name}
                        />
                    )}
                    label={label}
                />
            </Box>
            {state && field}
        </>
    );
};

export default ConditionalField;
