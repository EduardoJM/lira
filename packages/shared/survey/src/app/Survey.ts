import SurveyItem from './SurveyItem';

class Survey {
    items: SurveyItem<any>[];

    constructor() {
        this.items = [];
    }
}

export default Survey;
