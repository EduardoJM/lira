import Sample from '../Sample';
import ConfianceInterval from './ConfianceInterval';
import { ppf } from '../../utils/stats';

class ProportionConservator extends ConfianceInterval {
    constructor() {
        super();
    }

    getError<T>(sample: Sample<T>, confiability: number): number {
        if (confiability < 0 || confiability > 1) {
            throw new Error('confiability must be a probability between 0 and 1.');
        }
        const prob = (1 - confiability) / 2;
        const z = Math.abs(ppf(0, 1, prob));
        const error = z / Math.sqrt(4 * sample.getSampleSize());
        return error;
    }
}

export default ProportionConservator;
