export class KeyValuePair<T1, T2> {
    constructor(key: T1, value: T2) {
        this.key = key;
        this.value = value;
    }

    key: T1;
    value: T2;
}

export class StringsKeyValue {

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
    
    key: string;
    value: string;
}