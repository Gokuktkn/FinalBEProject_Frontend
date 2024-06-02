const API_URL = 'http://localhost:8080'
export const fetchAPI = async (endpoint, method, bodyData, token) => {
    const response = await fetch(API_URL + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? "Token " + token : "Token"
        },
        body: JSON.stringify(bodyData)
    })
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data
}
export const fetchIMG = async (endpoint, method, bodyData, token) => {
    const response = await fetch(API_URL + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Authorization": token ? "Token " + token : "Token"
        },
        body: bodyData
    })
    const data = await response.json();
    return data
}