abstract class SurveyItemDataType<T> {
    private data: T;

    constructor(initialValue: T) {
        this.data = initialValue;
    }

    abstract validate(data: T): boolean;

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
