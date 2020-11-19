import Sample from '../Sample';
import ConfianceInterval from './ConfianceInterval';
import ppf from '../../utils/stats';

class ProportionConservator extends ConfianceInterval {
    sample: Sample<any>;

    constructor(sample: Sample<any>) {
        super();
        this.sample = sample;
    }

    getError(confiability: number): number {
        if (confiability < 0 || confiability > 1) {
            throw new Error('confiability must be a probability between 0 and 1.');
        }
        const prob = (1 - confiability) / 2;
        const z = Math.abs(ppf(0, 1, prob));
        const error = z / Math.sqrt(4 * this.sample.getSampleSize());
        return error;
    }

    static getSampleSize(confiability: number, error: number): number {
        if (confiability < 0 || confiability > 1) {
            throw new Error('confiability must be a probability between 0 and 1.');
        }
        if (error < 0 || error > 1) {
            throw new Error('error must be a probability between 0 and 1.');
        }
        const prob = (1 - confiability) / 2;
        const z = Math.abs(ppf(0, 1, prob));
        const n = ((z / error) ** 2) / 4;
        return Math.ceil(n);
    }
}

export default ProportionConservator;
