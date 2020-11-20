import { SurveyItemDataType } from './data';

class SurveyItem<T extends SurveyItemDataType<any>> {
    data: T;

    id: number;

    text: string;

    constructor(d: T, text?: string, id?: number) {
        this.data = d;
        this.text = '';
        this.id = -1;
        if (text !== undefined) {
            this.text = text;
        }
        if (id !== undefined) {
            this.id = id;
        }
    }
}

export default SurveyItem;
