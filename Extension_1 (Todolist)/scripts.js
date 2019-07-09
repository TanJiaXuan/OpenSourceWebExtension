var alarmplay = document.getElementById('alarm');
submit.addEventListener('click', () => {
  alert('Reminder Created. Click OK to activate the Reminder');
  var hours = document.getElementById('hours').value;
  var minutes = document.getElementById('minutes').value;
  var seconds = document.getElementById('seconds').value;
  var sec = hours * 3600000 + minutes * 60 * 1000 + seconds * 1000;
  var remainder1 = document.getElementById('remainder').value;
  var alarmInfo = {
    when: sec
  };

  browser.alarms.create(remainder1, {
    when: Date.now() + sec
  });
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
});
