// Get data  from Local Storage
const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

// Get data  from Local Storage
const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    if (!data) return null
    return JSON.parse(data)
}

export default saveToLocalStorage
export { getFromLocalStorage }