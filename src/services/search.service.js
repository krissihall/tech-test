import { handleResponse } from '../helpers/service-helpers';
import { useGlobalStore } from '../stores';

const getSearchResults = (keyword, category) => {
    try {
        let cat;

        if (category === 'title') {
            // Search by Title
            cat = 't';
        } else if (category === 'id') {
            // Search by IMDb ID
            cat = 'i';
        } else if (category === 'search') {
            cat = 's';
        } else {
            // Fallback to title if not set
            cat = 's';
        }

        const queryString = `&${cat}=`;
        
        return fetch(`/api/?apikey=${useGlobalStore().apiKey}${queryString}${keyword}`, {
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
