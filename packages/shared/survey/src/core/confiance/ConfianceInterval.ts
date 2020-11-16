import Sample from '../Sample';

class ConfianceInterval {
    constructor() {
    }

    getError<T>(sample: Sample<T>, confiability?: number): number {
        return NaN;
    }
}

export default ConfianceInterval;
