// TODO: environment variable?
const SERVER_URL = 'http://localhost:8080';

const getSolution = async (data) => {
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
    const solution = await response.json();
    return solution;
};

export {
    getSolution
};