function deepcopy(nestedArray) {
    let iterations = nestedArray.length;

    let deepCopy = [];

    for (let i = 0; i < iterations; i++) {
        const currentIterand = nestedArray[i].slice();
        deepCopy.push(currentIterand);
    }

    return deepCopy.slice();
}

export default deepcopy;