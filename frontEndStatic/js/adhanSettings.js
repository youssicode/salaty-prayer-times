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
        const settings = [{fajr:'on',dhuhr:'on',asr:'on',maghrib:'on',ishaa:'on'}, 'alarmISactive']
        saveToLocalStorage("adhanSetting", settings)
    } else {
        if (adhanSetting[1] === 'alarmISactive') {
            for(const prayerName in adhanSetting[0]) {
                if (Object.hasOwnProperty.call(adhanSetting[0], prayerName)) {
                    if(adhanSetting[0][prayerName] == 'off') {
                        const adhanBell = document.querySelector(`[data-prayer="${prayerName}"]`)
                        adhanBell.classList.add("prayerTimeCard__adhan--disabled")
                    }
                    if(adhanSetting[0][prayerName] == 'on') {
                        const adhanBell = document.querySelector(`[data-prayer="${prayerName}"]`)
                        adhanBell.classList.remove("prayerTimeCard__adhan--disabled")
                    }
                }
            }
            dom().adhanBells.forEach(el => {
                el.addEventListener("click", function () {
                    this.classList.toggle("prayerTimeCard__adhan--disabled")
                    const settings = [{},'alarmISactive']
                    dom().adhanBells.forEach(bell => {
                        const prayer_name = bell.dataset.prayer
                        if (prayer_name) { // to avoid the element related to 'sunrise'
                            if (bell.classList.contains("prayerTimeCard__adhan--disabled")) {
                                settings[0][prayer_name] = "off"
                            } else {
                                settings[0][prayer_name] = "on"
                            }
                        }
                    })
                    saveToLocalStorage("adhanSetting", settings)
                })
            })
        } else {
            dom().adhanBells.forEach(bell => bell.classList.add("prayerTimeCard__adhan--disabled"))
            dom().activateAdhanSwitch.checked = true
        }
    }
}

export const adhanActivation = function() {
    const adhanSetting = getDataFromLocalStorage('adhanSetting')
    if (this.checked) { // if we use arrow function, 'this' won't refer to the element checked.
        adhanSetting[1] = 'adhanDeactivated'
    } else {
        adhanSetting[1] = 'alarmISactive'
    }
    saveToLocalStorage("adhanSetting", adhanSetting)
    loadAdhanSettings()
  }