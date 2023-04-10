// Get data  from Local Storage
const saveToLocalStorage = (key, data) => {
    let salatyAppInfos = JSON.parse(localStorage.getItem("salaty_prayer_times_infos")) || {}
    salatyAppInfos[key] = data
    localStorage.setItem("salaty_prayer_times_infos", JSON.stringify(salatyAppInfos))
}

// Get data ('prop's value) from Local Storage
export const getDataFromLocalStorage = (prop) => {
    const key = localStorage.getItem('salaty_prayer_times_infos')
    const data = key ? JSON.parse(key) : null
    return data && data.hasOwnProperty(prop) ? data[prop] : null
}
export default saveToLocalStorage