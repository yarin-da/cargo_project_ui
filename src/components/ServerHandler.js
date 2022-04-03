// TODO: environment variable?
const SERVER_URL = 'http://localhost:10789';

const getSolution = async (data) => {
    const request = `${SERVER_URL}/solve`;
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
};

export {
    getSolution
};