import React, {
    useRef,
    useEffect,
    useState,
    ChangeEvent,
} from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import { useField } from '@unform/core';

interface ShortTextFieldProps extends StandardTextFieldProps {
    name: string;
    label: string;
}

const ShortTextField: React.FC<ShortTextFieldProps> = (props) => {
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
        setValue(e.target.value as string);
    }

    return (
        <TextField
            ref={inputRef}
            type="text"
            name={name}
            label={label}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            {...others}
        />
    );
};

export default ShortTextField;
