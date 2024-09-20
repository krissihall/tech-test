const handleResponse = (response) => {
    return response.text().then((text) => {
        if (!response.ok) {
            const error = `request to ${response.url} return ${response.status}:${response.statusText}`;
            return Promise.reject(error);
        }

        const data = text && JSON.parse(text);
        return data;
    });
};

export {
    handleResponse
};
