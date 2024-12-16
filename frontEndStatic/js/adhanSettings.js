//? Imported Modules
//==================
import { saveToLocalStorage, getDataFromLocalStorage } from "./localStorage.js"
import { query, queryAll } from "./domElements.js"

//? Constants
// =========
const ADHAN_SETTING_KEY = "adhanSetting"
const ADHAN_ACTIVE_STATUS = "adhanISactive"
const ADHAN_DEACTIVATED_STATUS = "adhanDeactivated"
const DISABLED_CLASS = "prayerTimeCard__adhan--disabled"

//? DOM Elements
//===========
const activateAdhanSwitch = query(".switch__input--adhan")
const adhanBells = queryAll(".prayerTimeCard__adhan")

//? Functions
//===========
//* Activate / Deactivate Call-To-Prayer feature
export const loadAdhanSettings = () => {
  const adhanSetting = getDataFromLocalStorage(ADHAN_SETTING_KEY)
  addEventListenerToAlarmIcons()
  adhanSetting ? renderAlarmIcons(adhanSetting) : initiateAdhanSettings()
}

export const initiateAdhanSettings = () => {
  saveToLocalStorage(ADHAN_SETTING_KEY, [
    { fajr: true, dhuhr: true, asr: true, maghrib: true, ishaa: true },
    ADHAN_ACTIVE_STATUS,
  ])
  activateAdhanSwitch.checked = false
  adhanBells.forEach((bell) => bell.classList.remove(DISABLED_CLASS))
}

const renderAlarmIcons = (savedSetting) => {
  const [alarms, alarmStatus] = savedSetting
  const isAdhanActive = alarmStatus === ADHAN_ACTIVE_STATUS

  activateAdhanSwitch.checked = !isAdhanActive

  adhanBells.forEach((bell) => {
    const prayerName = bell.dataset.prayer
    const shouldDisable = !isAdhanActive || !alarms[prayerName]
    bell.classList.toggle(DISABLED_CLASS, shouldDisable)
  })
}

const addEventListenerToAlarmIcons = () => {
  adhanBells.forEach((bellBtn) => {
    bellBtn.addEventListener("click", function () {
      if (activateAdhanSwitch.checked) return

      const prayer = this.dataset.prayer
      if (saveAlarmsStates(prayer)) this.classList.toggle(DISABLED_CLASS)
    })
  })
}

const saveAlarmsStates = (prayerName) => {
  const adhanSetting = getDataFromLocalStorage(ADHAN_SETTING_KEY)
  if (adhanSetting) {
    adhanSetting[0][prayerName] = !adhanSetting[0][prayerName]
    saveToLocalStorage(ADHAN_SETTING_KEY, adhanSetting)
    return true
  }
  return false
}

export const adhanActivation = () => {
  const adhanSetting = getDataFromLocalStorage(ADHAN_SETTING_KEY)
  adhanSetting[1] = activateAdhanSwitch.checked
    ? ADHAN_DEACTIVATED_STATUS
    : ADHAN_ACTIVE_STATUS
  saveToLocalStorage(ADHAN_SETTING_KEY, adhanSetting)
  renderAlarmIcons(adhanSetting)
}
