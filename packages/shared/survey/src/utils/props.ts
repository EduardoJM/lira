export default function applyPropsTo(from: any, toObject: any) {
    if (from === undefined || from === null || toObject === undefined || toObject === null) {
        return;
    }
    const keys = Object.keys(from);
    keys.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(from, key)) {
            return;
        }
        const value = keys[key as any];
        if (value === undefined) {
            return;
        }
        if (Object.prototype.hasOwnProperty.call(toObject, key)) {
            toObject[key as any] = value;
        }
    });
}
