// const REQUEST_URL = 'https://cargo-optimizer-server.herokuapp.com/api/solve';
const REQUEST_URL = 'http://localhost:8080/api/solve';

const getSolution = async (data) => {
    try {
        // send a post request with a json body
        const request = REQUEST_URL;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        // fetch and parse to json
        const response = await fetch(request, options);
        const jsonData =  await response.json();
        // invalid solution - simply throw an error
        if (jsonData['error']) throw Error("failedToOrganizeYourPackages");
        return jsonData;
    } catch (e) {
        const error = new Error();
        throw Object.assign(error, { message: "failedToOrganizeYourPackages" });
    }
};

export {
    getSolution
};