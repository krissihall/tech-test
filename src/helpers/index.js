const isEmpty = (value) => {
    if (typeof value === "number") return false
    else if (typeof value === "string") return value.trim().length === 0
    else if (Array.isArray(value)) return value.length === 0
    else if (typeof value === "object") return value == null || Object.keys(value).length == 0
    else if (typeof value === "boolean") return false
    else return !value
};

const isYear = (str) => {
    if (/^\d{4}$/.test(str)) {
        const year = parseInt(str, 10);
        return year >= 1000 && year <= 9999;
    }
    return false;
};

const dasherize = (string) => {
    return (string != null) && (typeof string === "string" || typeof string === String) ? string.toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s-]+/g, "-") : null;
};

const generateID = () => {
    return Math.random().toString(36).substr(2, 9);
};

const throttle = (fn, wait) => {
    let throttled = false;
    return (...args) => {
        if (!throttled) {
            fn.apply(this, args);
            throttle = true;
            setTimeout(() => { throttled = false; }, wait);
        }
    };
};

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(context, args), delay);
    }
};

export {
    isEmpty,
    isYear,
    dasherize,
    generateID,
    throttle,
    debounce
};
