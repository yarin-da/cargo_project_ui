// TODO: environment variable? we may want to choose different port if already taken
const SERVER_URL = 'http://localhost:8080/api/solve';

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