class SurveyItemDataType<T> {
    private data: T;

    constructor(initialValue: T) {
        this.data = initialValue;
    }

    validate(data: T): boolean {
        throw new Error('abstract only method. don\'t instantiate the SurveyItemDataType.');
    }

    setValue(value: T): boolean {
        if (!this.validate(value)) {
            return false;
        }
        this.data = value;
        return true;
    }

    getValue(): T {
        return this.data;
    }
}

export default SurveyItemDataType;
