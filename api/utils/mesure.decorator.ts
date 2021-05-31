const measure = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
        const start = new Date();
        const result = originalMethod.apply(this, args);
        const finish = new Date();
        console.log(`Execution time: ${+finish - +start} milliseconds`);
        return result;
    };
};

export default measure;
