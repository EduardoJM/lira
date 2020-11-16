class Sample<T extends Object> {
    private sample: T[];

    constructor () {
        this.sample = [];
    }

    append(item: T): Sample<T> {
        this.sample = [
            ...this.sample,
            item
        ];
        return this;
    }

    appendSample(otherSample: Sample<T>): Sample<T> {
        this.sample = [
            ...this.sample,
            ...otherSample.sample
        ];
        return this;
    }

    getSampleSize(): number {
        return this.sample.length;
    }
}

export default Sample;
