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
        } else {
            // Fallback to title if not set
            cat = 't';
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

export const searchService = {
    getSearchResults
};
