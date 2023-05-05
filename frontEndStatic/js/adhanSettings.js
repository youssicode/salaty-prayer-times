//? Imported Modules
//==================
import {
  saveToLocalStorage,
  getDataFromLocalStorage,
} from "./saveToLocalStorage.js";
import dom from "./domElements.js";

//? Functions
//===========
//* Activate / Di-activate Call-To-Prayer feature
export const loadAdhanSettings = () => {
  const adhanSetting = getDataFromLocalStorage("adhanSetting");
  if (!adhanSetting) {
    initiateAdhanSettings();
  } else {
    renderAlarmIcons(adhanSetting);
  }
  addEventListenerToAlarmIcons();
};
const initiateAdhanSettings = () => {
  const settings = [
    { fajr: "on", dhuhr: "on", asr: "on", maghrib: "on", ishaa: "on" },
    "alarmISactive",
  ];
  saveToLocalStorage("adhanSetting", settings);
  dom().activateAdhanSwitch.checked = false;
};

const renderAlarmIcons = (savedSetting) => {
  if (savedSetting[1] == "alarmISactive") {
    for (const prayerName in savedSetting[0]) {
      if (Object.hasOwnProperty.call(savedSetting[0], prayerName)) {
        if (savedSetting[0][prayerName] == "off") {
          const adhanBell = document.querySelector(
            `[data-prayer="${prayerName}"]`
          );
          adhanBell.classList.add("prayerTimeCard__adhan--disabled");
        }
        if (savedSetting[0][prayerName] == "on") {
          const adhanBell = document.querySelector(
            `[data-prayer="${prayerName}"]`
          );
          adhanBell.classList.remove("prayerTimeCard__adhan--disabled");
        }
      }
    }
  }

  if (savedSetting[1] == "adhanDeactivated") {
    dom().adhanBells.forEach((bell) =>
      bell.classList.add("prayerTimeCard__adhan--disabled")
    );
    dom().activateAdhanSwitch.checked = true;
  }
};

const addEventListenerToAlarmIcons = () => {
  dom().adhanBells.forEach((bellBtn) => {
    bellBtn.addEventListener("click", function () {
      if (dom().activateAdhanSwitch.checked == true) return;
      this.classList.toggle("prayerTimeCard__adhan--disabled");
      const prayer = this.dataset.prayer;
      saveAlarmsStates(prayer);
    });
  });
};

const saveAlarmsStates = (prayerName) => {
  const adhanSetting = getDataFromLocalStorage("adhanSetting");
  if (adhanSetting[0][prayerName] == "on") {
    adhanSetting[0][prayerName] = "off";
  } else {
    adhanSetting[0][prayerName] = "on";
  }
  saveToLocalStorage("adhanSetting", adhanSetting);
};

export const adhanActivation = function () {
  const adhanSetting = getDataFromLocalStorage("adhanSetting");
  if (this.checked) {
    // if we use arrow function, 'this' won't refer to the element checked.
    adhanSetting[1] = "adhanDeactivated";
  } else {
    adhanSetting[1] = "alarmISactive";
  }
  saveToLocalStorage("adhanSetting", adhanSetting);
  renderAlarmIcons(adhanSetting);
};
