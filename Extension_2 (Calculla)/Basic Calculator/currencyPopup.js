const MAX_CURRENCIES = 15;
const MIN_CURRENCIES = 2;
var count_currencies = 0;
var loading_count = 0;
var background_page = chrome.extension.getBackgroundPage();
var timer;

function onCurrencyChange(event) {
  var option = event.target.options[event.target.selectedIndex];
  localStorage.setItem(event.target.id, option.value);

  update(event.target.name);
}

function onValueChange(event) {
  update(event.target.name);
}

function onKeyPress(event) {
  return (
    (event.keyCode > 47 && event.keyCode < 58) ||
    event.keyCode == 44 ||
    event.keyCode == 46
  );
}








