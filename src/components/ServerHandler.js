// TODO: environment variable? we may want to chooose different port if already taken
//const SERVER_URL = 'http://63.32.25.120/api/solve';
const SERVER_URL = 'http://localhost:8080';

const getSolution = async (data) => {
    try {
        const request = `${SERVER_URL}`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(request, options);
        const jsonData =  await response.json();
        if (jsonData['error']) throw "failedToOrganizeYourPackages";
        return jsonData;
    } catch (e) {
        throw "failedToOrganizeYourPackages";
    }
};

export {
    getSolution
};