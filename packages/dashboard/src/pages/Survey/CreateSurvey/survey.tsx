import React from 'react';
import { ConditionalField, IntegerField } from '../../../components/Forms'
import * as yup from 'yup';

import {
    SurveyInteger,
    SurveyOptions,
    SurveyItemDataType
} from '@lira/survey';

export interface DataType {
    id: string;
    text: string;
    create: () => SurveyItemDataType<any>;
    configurationPage: () => React.ReactNode;
    getSchema: () => yup.ObjectSchemaConstructor;
}

export const dataTypes = [
    {
        id: 'int',
        text: 'Número Inteiro',
        create: function(): SurveyInteger  {
            return new SurveyInteger();
        },
        configurationPage: function(): React.ReactNode {
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
        getSchema: function() {
            return yup.object({
                hasMinimun: yup.boolean().required(),
                minimun: yup.mixed().when('hasMinimun', {
                    is: true,
                    then: yup.number().required(),
                    otherwise: undefined
                }),
                hasMaximun: yup.boolean().required(),
                maximun: yup.mixed().when('hasMaximun', {
                    is: true,
                    then: yup.number().required(),
                    otherwise: undefined
                }),
            });
        }
    },
    {
        id: 'options',
        text: 'Opções',
        create: function(): SurveyOptions {
            return new SurveyOptions([
                {
                    id: '',
                    text: 'Selecionar...'
                }
            ])
        },
        configurationPage: function(): React.ReactNode {
            return (
                <p>Oie</p>
            );
        },
        getSchema: function() {
            return yup.object({});
        }
    }
];
