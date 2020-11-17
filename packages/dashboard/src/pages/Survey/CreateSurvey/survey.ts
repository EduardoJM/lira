import {
    SurveyInteger,
    SurveyOptions,
    SurveyItemDataType
} from '@lira/survey';

export interface DataType {
    id: string;
    text: string;
    create: () => SurveyItemDataType<any>;
}

export const dataTypes = [
    {
        id: 'int',
        text: 'Número Inteiro',
        create: function(): SurveyInteger  {
            return new SurveyInteger();
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
        }
    }
];
