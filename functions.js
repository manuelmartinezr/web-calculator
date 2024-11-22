function operate(operator, a, b){
    const operations = {
        add: (a,b) => a + b,
        sub: (a, b) => a - b,
        mult: (a, b) => a * b,
        div: (a,b) => a / b,
    };
    const operation = operations[operator];
    if (!operation){
        throw new Error(`Unsupported operator: ${operator}`);
    }
    return operation(a,b)
}