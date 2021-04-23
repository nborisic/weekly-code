export const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateStyle = () => {
    return {
        fontSize: `${randomInt(19,23)}px`,
        marginTop: `${randomInt(-3, 3)}px`,
        letterSpacing: `${randomInt(-3, 3)}px`,
        opacity: `${randomInt(60, 90) / 100}`,
    }
}

export function between(x, min, max) {
    return x >= min && x <= max;
}