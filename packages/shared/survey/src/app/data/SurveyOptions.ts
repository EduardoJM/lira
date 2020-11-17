import SurveyItemDataType from './SurveyItemDataType';

export interface SurveyOptionsData {
    id: string;
    text: string;
}

export class SurveyOptions extends SurveyItemDataType<string> {
    items: SurveyOptionsData[];

    constructor(options: SurveyOptionsData[]) {
        super('');
        this.items = options;
    }

    validate(data: string): boolean {
        const filtered = this.items.filter((item) => {
            return (item.id.toLowerCase() === data.toLowerCase());
        });
        return (filtered.length === 1);
    }
}
