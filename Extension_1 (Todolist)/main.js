var audio = new Audio("alarm.mp3");

browser.alarms.onAlarm.addListener(alarm => {
  audio.play();
  browser.notifications.create(alarm.name, {
    type: "basic",
    iconUrl: "alarm.png",
    title: "Remainder",
    message: alarm.name
  });
});
