export const fetchAPI = async (endpoint, method, bodyData) => {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    })
    const getRes = await fetch('http://localhost:8080/user')
    const data = response.json();
    console.log(response)
    return data
}
export const fetchIMG = async (endpoint, method, bodyData) => {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        mode: "cors",
        body: bodyData
    })
    const getRes = await fetch('http://localhost:8080/user')
    const data = response.json();
    console.log(data)
    return data
}