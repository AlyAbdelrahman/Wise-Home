import utils from './utils'

function getCountriesData() {
    const requestOptions = {
        method: 'GET',
    }
    const url = `${process.env.REACT_APP_API_URL}/rest/v2/all`;
    return fetch(url, requestOptions)
    .then(utils.handleResponse);
}

const countriesDataServices = {
    getCountriesData
}

export default countriesDataServices;