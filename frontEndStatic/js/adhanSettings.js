//? Imported Modules
//==================
import { saveToLocalStorage, getDataFromLocalStorage} from "./localStorage.js";
import dom from "./domElements.js";

//? Functions
//===========

//* Activate / Deactivate Call-To-Prayer feature
export const loadAdhanSettings = () => {
  const adhanSetting = getDataFromLocalStorage("adhanSetting")
  addEventListenerToAlarmIcons()
  if (!adhanSetting) {
    initiateAdhanSettings()
  } else {
    renderAlarmIcons(adhanSetting)
  }
};

export const initiateAdhanSettings = () => {
  const defaultAdhanSettings = [
    { fajr: true, dhuhr: true, asr: true, maghrib: true, ishaa: true },
    "adhanISactive",
  ]
  saveToLocalStorage("adhanSetting", defaultAdhanSettings)
  dom().activateAdhanSwitch.checked = false
  dom().adhanBells.forEach(bell => bell.classList.remove("prayerTimeCard__adhan--disabled"))
}

const renderAlarmIcons = (savedSetting) => {
  const [alarms, alarmStatus] = savedSetting
  if (alarmStatus === "adhanISactive") {
    for (const prayerName in alarms) {
      const adhanBell = document.querySelector(`[data-prayer="${prayerName}"]`);
      adhanBell.classList.toggle("prayerTimeCard__adhan--disabled", alarms[prayerName] === false);
    }
  } else {
    dom().adhanBells.forEach(bell => bell.classList.add("prayerTimeCard__adhan--disabled"))
    dom().activateAdhanSwitch.checked = true
  }
}

const addEventListenerToAlarmIcons = () => {
  dom().adhanBells.forEach((bellBtn) => {
    bellBtn.addEventListener("click", function () {
      if (dom().activateAdhanSwitch.checked) return

      const prayer = this.dataset.prayer
      if (saveAlarmsStates(prayer)) this.classList.toggle("prayerTimeCard__adhan--disabled")

    })
  })
}

const saveAlarmsStates = (prayerName) => {
  const adhanSetting = getDataFromLocalStorage("adhanSetting")
  if (adhanSetting) {
    adhanSetting[0][prayerName] = !adhanSetting[0][prayerName]
    saveToLocalStorage("adhanSetting", adhanSetting)
    return true
  }
  return false
};

export const adhanActivation = () => {
  const adhanSetting = getDataFromLocalStorage("adhanSetting")
  adhanSetting[1] = dom().activateAdhanSwitch.checked ? "adhanDeactivated" : "adhanISactive"
  saveToLocalStorage("adhanSetting", adhanSetting);
  renderAlarmIcons(adhanSetting);
};






// //* Activate / Deactivate Call-To-Prayer feature
// export const loadAdhanSettings = () => {
//   const adhanSetting = getDataFromLocalStorage("adhanSetting")
//   addEventListenerToAlarmIcons()
//   if (!adhanSetting) {
//     initiateAdhanSettings()
//   } else {
//     renderAlarmIcons(adhanSetting)
//   }
// };

// export const initiateAdhanSettings = () => {
//   const settings = [
//     { fajr: true, dhuhr: true, asr: true, maghrib: true, ishaa: true },
//     "alarmISactive",
//   ]
//   saveToLocalStorage("adhanSetting", settings)
//   dom().activateAdhanSwitch.checked = false
//   dom().adhanBells.forEach(bell => bell.classList.remove("prayerTimeCard__adhan--disabled"))
// }

// const renderAlarmIcons = (savedSetting) => {
//   const alarmStatus = savedSetting[1]
//   if (alarmStatus === "alarmISactive") {
//     for (const prayerName in savedSetting[0]) {
//       const adhanBell = document.querySelector(`[data-prayer="${prayerName}"]`);
//       adhanBell.classList.toggle("prayerTimeCard__adhan--disabled", savedSetting[0][prayerName] === false);
//     }
//   } else {
//     dom().adhanBells.forEach(bell => bell.classList.add("prayerTimeCard__adhan--disabled"))
//     dom().activateAdhanSwitch.checked = true
//   }
// }

// const addEventListenerToAlarmIcons = () => {
//   dom().adhanBells.forEach((bellBtn) => {
//     bellBtn.addEventListener("click", function () {
//       if (dom().activateAdhanSwitch.checked) return

//       this.classList.toggle("prayerTimeCard__adhan--disabled")

//       const prayer = this.dataset.prayer
//       saveAlarmsStates(prayer)
//     })
//   })
// }

// const saveAlarmsStates = (prayerName) => {
//   const adhanSetting = getDataFromLocalStorage("adhanSetting")
//   const {[prayerName] : state} = adhanSetting[0]
//   adhanSetting[0][prayerName] = state === true ? false : true
//   saveToLocalStorage("adhanSetting", adhanSetting)
// };

// export const adhanActivation = () => {
//   const adhanSetting = getDataFromLocalStorage("adhanSetting")
//   adhanSetting[1] = dom().activateAdhanSwitch.checked ? "adhanDeactivated" : "alarmISactive"
//   saveToLocalStorage("adhanSetting", adhanSetting);
//   renderAlarmIcons(adhanSetting);
// };
