// Get data  from Local Storage
const saveToLocalStorage = (key, data) => {
    let salatyAppInfos = JSON.parse(localStorage.getItem("salaty_prayer_times_infos")) || {}
    salatyAppInfos[key] = data
    localStorage.setItem("salaty_prayer_times_infos", JSON.stringify(salatyAppInfos))
}

// Get data  from Local Storage
const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export default saveToLocalStorage
export { getFromLocalStorage }