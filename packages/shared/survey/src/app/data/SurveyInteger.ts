import SurveyItemDataType from './SurveyItemDataType';
import applyPropsTo from '../../utils/props';

export interface SurveyIntegerCreateOptions {
    minimun?: number;
    maximun?: number;
}

export class SurveyInteger extends SurveyItemDataType<number> {
    minimun: number;

    maximun: number;

    constructor(opts?: SurveyIntegerCreateOptions) {
        super(0);
        this.minimun = -Infinity;
        this.maximun = Infinity;
        applyPropsTo(opts, this);
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
