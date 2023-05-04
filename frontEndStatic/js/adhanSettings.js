//? Imported Modules
//==================
import { saveToLocalStorage, getDataFromLocalStorage } from "./saveToLocalStorage.js"
import dom from "./domElements.js"


//? Functions
//===========
//* Activate / Di-activate Call-To-Prayer feature
export const loadAdhanSettings = ()=> {
    const adhanSetting = getDataFromLocalStorage('adhanSetting')
    if (!adhanSetting) {
        const settings = {fajr:'on',dhuhr:'on',asr:'on',maghrib:'on',ishaa:'on'}
        saveToLocalStorage("adhanSetting", settings)
    } else {
        for(const prayerName in adhanSetting) {
            if (Object.hasOwnProperty.call(adhanSetting, prayerName)) {
                if(adhanSetting[prayerName] == 'off') {
                    const adhanBell = document.querySelector(`[data-prayer="${prayerName}"]`)
                    adhanBell.classList.add("prayerTimeCard__adhan--disabled")
                }
            }
        }
    }
    dom().adhanBells.forEach(el => {
        el.addEventListener("click", function () {
            this.classList.toggle("prayerTimeCard__adhan--disabled")
            const settings = {}
            dom().adhanBells.forEach(bell => {
                const prayer_name = bell.dataset.prayer
                if (prayer_name) { // to avoid the element related to 'sunrise'
                    if (bell.classList.contains("prayerTimeCard__adhan--disabled")) {
                        settings[prayer_name] = "off"
                    } else {
                        settings[prayer_name] = "on"
                    }
                }
            })
            saveToLocalStorage("adhanSetting", settings)
        })
    });
}