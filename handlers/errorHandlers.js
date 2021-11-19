/**
 * Catch Errors HAndler
 * no try catch in this project, we wrap a function and pass it along to our express middleware
 */

export function catchErrors(fn) {
    return function(request, response, next) {
        return fn(request, response, next).catch((e) => {
            if (e.response){
                e.status = e.response.status;
            }
            next(e);
        });
    };
}