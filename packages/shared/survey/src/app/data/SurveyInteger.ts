import SurveyItemDataType from './SurveyItemDataType';

class SurveyInteger extends SurveyItemDataType<number> {
    minimun: number;

    maximun: number;

    constructor() {
        super(0);
        this.minimun = -Infinity;
        this.maximun = Infinity;
    }

    validate(data: number): boolean {
        if (!(Math.floor(data) === data && Math.ceil(data) === data)) {
            return false;
        }
        if (Number.isFinite(this.minimun)) {
            if (data < this.minimun) {
                return false;
            }
        }
        if (Number.isFinite(this.maximun)) {
            if (data > this.maximun) {
                return false;
            }
        }
        return true;
    }
}

export default SurveyInteger;
