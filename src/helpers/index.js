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

const isNumber = (value) => {
    return typeof value === 'number';
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

const buildQueryParams = (keyword, category, year, type, plot, page) => {
    let queryString = '';
    let cat = 's';

    if (category === 'title') {
        cat = 't';
    } else if (category === 'id') {
        cat = 'i';
    }

    queryString += `&${cat}=${keyword}`;

    if (year && !isEmpty(year) && isYear(year)) {
        queryString += `&year=${year}`;
    }

    if (type && !isEmpty(type)) {
        if (type === 'movie' || type === 'series' || type === 'episode') {
            queryString += `&type=${type}`;
        }
    }

    if (plot && !isEmpty(plot)) {
        if (plot === 'short' || plot === 'full') {
            queryString += `&plot=${plot}`;
        }
    }

    if (page && !isEmpty(page) && isNumber(page)) {
        queryString += `&page=${page}`;
    }

    queryString += '&r=json';
    return queryString;
}

const round = (num, decimals) => {
    const d = Math.pow(10, decimals);
    return Math.ceil(num * d) / d;
};

export {
    isEmpty,
    isYear,
    isNumber,
    dasherize,
    generateID,
    throttle,
    debounce,
    buildQueryParams, 
    round
};
