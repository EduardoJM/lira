import React, {
    useRef,
    useEffect,
    useState,
    ChangeEvent,
} from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import { useField } from '@unform/core';

interface IntegerFieldProps extends StandardTextFieldProps {
    name: string;
    label: string;
}

const IntegerField: React.FC<IntegerFieldProps> = (props) => {
    const { name, label, ...others } = props;
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: () => value,
            setValue: (ref: any, str: string) => {
                setValue(str);
            },
        });
    }, [fieldName, registerField, value]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const str = e.target.value as string;
        const num = parseInt(str, 10);
        setValue(num.toString(10));
    }

    return (
        <TextField
            ref={inputRef}
            type="number"
            name={name}
            label={label}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            {...others}
        />
    );
};

export default IntegerField;
