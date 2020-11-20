import React from 'react';
import * as yup from 'yup';

import {
    SurveyInteger,
    SurveyOptions,
    SurveyItemDataType,
} from '@lira/survey';

import { ConditionalField, IntegerField } from '../../../components/Forms';

export interface DataType {
    id: string;
    text: string;
    create: (data: any) => SurveyItemDataType<any>;
    configurationPage: () => React.ReactNode;
    getSchema: () => yup.Schema<any>;
}

export const dataTypes = [
    {
        id: 'int',
        text: 'Número Inteiro',
        create(data: any): SurveyInteger {
            return new SurveyInteger(data);
        },
        configurationPage(): React.ReactNode {
            return (
                <>
                    <ConditionalField
                        name="hasMinimun"
                        initialValue={false}
                        label="Possui valor mínimo"
                        field={
                            <IntegerField name="minimun" label="Valor Mínimo" />
                        }
                    />
                    <ConditionalField
                        name="hasMaximun"
                        initialValue={false}
                        label="Possui valor máximo"
                        field={
                            <IntegerField name="maximun" label="Valor Máximo" />
                        }
                    />
                </>
            );
        },
        getSchema() {
            return yup.object({
                hasMinimun: yup.boolean().required(),
                minimun: yup.number().when('hasMinimun', {
                    is: true,
                    then: yup.number().required(),
                    otherwise: (schema: any) => schema,
                }),
                hasMaximun: yup.boolean().required(),
                maximun: yup.mixed().when('hasMaximun', {
                    is: true,
                    then: yup.number().required(),
                    otherwise: (schema: any) => schema,
                }),
            });
        },
    },
    {
        id: 'options',
        text: 'Opções',
        create(data: any): SurveyOptions {
            return new SurveyOptions(data);
        },
        configurationPage(): React.ReactNode {
            return (
                <p>Oie</p>
            );
        },
        getSchema() {
            return yup.object({});
        },
    },
];
