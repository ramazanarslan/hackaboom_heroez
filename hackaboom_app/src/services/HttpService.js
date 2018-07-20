import Configuration from "../config/Configuration";

class HttpService {

    token;

    fetch(requestOptions) {

        return new Promise((resolve, reject) => {

            const url = this._createUrl(requestOptions);
            const overriddenHeaders = requestOptions.headers || {};
            const sendToken = requestOptions.sendToken || false;
            const processedRequestOptions = {
                ...requestOptions,
                body: JSON.stringify(requestOptions.body),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": (typeof sendToken === "undefined" ? "JWT " + this.token : (sendToken === false ? null : "JWT " + this.token)),
                    ...overriddenHeaders
                },
                timeout: Configuration.HTTP_TIMEOUT_MS
            };

            fetch(url, processedRequestOptions)
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                })
                .catch((err) => {
                    reject({
                        status: "HTTP SERVICE ERROR =>" + err
                    });
                });
        });
    }

    _createUrl(requestOptions) {
        let url = requestOptions.apiPath || Configuration.API_URL;
        url = requestOptions.path ? (url + requestOptions.path) : url;
        return "http://" + url;
    }

    setToken(token) {
        this.token = token;
    }
}

export default new HttpService();
