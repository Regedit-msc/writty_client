const { useState } = require("react");
const { useEffect } = require("react");

export const useFetch = (url, method, auth = false, data = {}, token = '') => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        switch (method) {
            case "POST":
                if (auth) {
                    fetch(url, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${token}`
                        },
                        method: method,
                        body: JSON.stringify(data)
                    }).then(res => {
                        if (res.ok) return res.json();
                        return res.json().then(json => Promise.reject(json));
                    }
                    ).then(jsonRes => {
                        setIsLoading(false);
                        setResponseData(jsonRes);
                    }).catch(() => {
                        setError(true);
                    });
                } else {
                    fetch(url, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        method: method,
                        body: JSON.stringify(data)
                    }).then(res => {
                        if (res.ok) return res.json();
                        return res.json().then(json => Promise.reject(json));
                    }
                    ).then(jsonRes => {
                        setIsLoading(false);
                        setResponseData(jsonRes);
                    }).catch(() => {
                        setError(true);
                    });
                }
                break;
            case "GET":
                if (auth) {
                    fetch(url, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${token}`
                        },
                        method: method,
                    }).then(res => {
                        if (res.ok) return res.json();
                        return res.json().then(json => Promise.reject(json));
                    }
                    ).then(jsonRes => {
                        setIsLoading(false);
                        setResponseData(jsonRes);
                    }).catch(() => {
                        setError(true);
                    });
                } else {
                    fetch(url, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        method: method,
                    }).then(res => {
                        if (res.ok) return res.json();
                        return res.json().then(json => Promise.reject(json));
                    }
                    ).then(jsonRes => {
                        setIsLoading(false);
                        setResponseData(jsonRes);
                    }).catch(() => {
                        setError(true);
                    });
                }
                break;
            default:
                break;
        }
    }, [url, method, data]);
    return [error, isLoading, responseData];
}
