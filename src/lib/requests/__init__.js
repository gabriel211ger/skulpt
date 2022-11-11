var $builtinmodule = function (name) {
    var request = {};


    //~ Module functions ........................................................

    request.get = new Sk.builtin.func(function (url, params, headers, cookies, auth, timeout) {
        var config = {
            mode: 'cors'
        };
        if(window.systemAuthorization != null)
        {
            config.headers = {
                Authorization: 'Basic ' + window.systemAuthorization
            }
        }
        return new Sk.misceval.promiseToSuspension(fetch(url.v, config).then((r) => r.text()).then((r) => Sk.ffi.remapToPy(r)));
    });

    request.post = new Sk.builtin.func(function (url, data, headers) {

        var config = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        };
        if(window.systemAuthorization != null)
        {
            config.headers = {
                Authorization: 'Basic ' + window.systemAuthorization
            }
        }
        return new Sk.misceval.promiseToSuspension(fetch(url.v, config).then((r) => r.text()).then((r) => Sk.ffi.remapToPy(r)));

    });


    return request;
};
