import { handleResponse } from '../helpers/service-helpers';
import { useGlobalStore } from '../stores';
import { isEmpty, isYear } from '@/helpers';

const getSearchResults = (keyword, category, year, type, plot) => {
    try {
        let queryString = '';
        let cat = 's';

        if (category === 'title') {
            // Search by Title
            cat = 't';
        } else if (category === 'id') {
            // Search by IMDb ID
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

        queryString += '&r=json';

        return fetch(`/api/?apikey=${useGlobalStore().apiKey}${queryString}`, {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'content-type': 'application/json'
            }
        })
            .then(handleResponse)
            .then((json) => {
                return json;
            });
    } catch (e) {
        console.log(`${e}: error getting movie results`);
    }
};

const getSearchHistory = () => {
    try {
        return fetch('/json/searchHistory', {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(handleResponse)
            .then((json) => {
                return json;
            });
    } catch (e) {
        console.log(`${e}: error getting search history`);
    }
};

const addSearchHistoryEntry = (dataObj) => {
    try {
        return fetch('/json/searchHistory', {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(dataObj)
        })
            .then(handleResponse)
            .then((json) => {
                return json;
            });
    } catch (e) {
        console.log(`${e}: error saving movie result to json-server`);
    }
};

export const searchService = {
    getSearchResults,
    getSearchHistory,
    addSearchHistoryEntry
};
