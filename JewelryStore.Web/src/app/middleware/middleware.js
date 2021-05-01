import { TOKEN, ENDPOINT } from '../common/constant';

export const httpMiddleware = store => next => action => {
    if (action && action.hasOwnProperty(ENDPOINT) && action.endpoint) {

        const fetchOptions = {
            method: action.verb,
            headers: action.headers,
            body: action.payload || null
        };

        if (action.hasOwnProperty(TOKEN)) {
            fetchOptions.headers.Authorization = action.token;
        };

        fetch(action.endpoint, fetchOptions)
            .then(response => response.json())
            .then(data => next(action.onSuccess(data)))
            .catch(error => next(action.onFail(error)));
    }
    else {
        return next(action);
    };
};