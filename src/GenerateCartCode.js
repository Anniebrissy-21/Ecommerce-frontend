function generateRandomAlphanumeric(length=10) {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(Math.random() * char.length);
        result += char[randomIndex]
    }
    return result;
}

export const randomValue = generateRandomAlphanumeric();