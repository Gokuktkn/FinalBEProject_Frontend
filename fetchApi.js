export const fetchAPI = async (endpoint, method, bodyData) => {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    })
    const data = await response.json();
    return data
}
export const fetchIMG = async (endpoint, method, bodyData) => {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        mode: "cors",
        body: bodyData
    })
    const data = await response.json();
    return data
}