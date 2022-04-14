export type props = { [key:string]: string|number|boolean|Date }

export abstract class Serializable {
    abstract empty(): object;

    getProps(data: props): props {
        if (Object.keys(data).length === 0) return {};

        const current: props = {};
        Object.keys(this.empty()).forEach(
            key => key in data ? current[key] = data[key] : null
        );
        return current;
    }
}
