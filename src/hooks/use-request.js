import { useState } from "react";

const useRequest = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState();

    const fetchData = async (requestConfig) => {
        setError(false);

        const response = await fetch(requestConfig.apiEndpoint, {
            method: requestConfig.method || "GET",
            headers: requestConfig.headers || {},
            body: requestConfig.body
                ? JSON.stringify(requestConfig.body)
                : null,
        });

        if (response.status < 200 && response.status > 299) {
            throw new Error(response.status);
        }

        const responseData = await response.json();

        return responseData;
    };

    return {
        fetchData,
        isLoaded,
        setIsLoaded,
        error,
        setError,
    };
};

export default useRequest;
