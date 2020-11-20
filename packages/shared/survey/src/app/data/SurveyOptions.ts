import SurveyItemDataType from './SurveyItemDataType';
import applyPropsTo from '../../utils/props';

export interface SurveyOptionsData {
    id: string;
    text: string;
}

export interface SurveyOptionsCreateOptions {
    items?: SurveyOptionsData[];
}

export class SurveyOptions extends SurveyItemDataType<string> {
    items: SurveyOptionsData[];

    constructor(opts?: SurveyOptionsCreateOptions) {
        super('');
        this.items = [];
        applyPropsTo(opts, this);
    }

    validate(data: string): boolean {
        const filtered = this.items
            .filter((item) => item.id.toLowerCase() === data.toLowerCase());
        return (filtered.length === 1);
    }

    // eslint-disable-next-line class-methods-use-this
    toString(): string {
        return 'Opções';
    }
}
