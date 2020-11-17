import { SurveyItemDataType } from './data';

class SurveyItem<T extends SurveyItemDataType<any>> {
    data: T;

    constructor(d: T) {
        this.data = d;
    }
}

export default SurveyItem;
