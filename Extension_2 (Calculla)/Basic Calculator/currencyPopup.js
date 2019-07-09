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

function onPaste(event) {
  var value = event.clipboardData.getData('Text');
  value = value.replace(/[^0-9.,]/g, '');
  event.returnValue = false;

  event.target.value = value;
}

function addCurrency(init) {
  var input_value = document.createElement('input');
  input_value.type = 'text';
  input_value.id = 'value' + count_currencies;
  input_value.name = count_currencies;
  input_value.value = 'loading...';
  input_value.setAttribute('maxlength', 12);
  input_value.addEventListener('keyup', onValueChange, false);
  input_value.addEventListener('paste', onPaste, false);
  input_value.onkeypress = function() {
    return onKeyPress(event);
  };

  var td_left = document.createElement('td');
  td_left.setAttribute('class', 'paddingtd');
  td_left.appendChild(input_value);

  var select_currency = document.createElement('select');
  select_currency.id = 'currency' + count_currencies;
  select_currency.name = count_currencies;
  select_currency.addEventListener('keypress', onCurrencyChange, false);
  select_currency.addEventListener('change', onCurrencyChange, false);

  for (var currency in currenciesJSON) {
    var option = document.createElement('option');
    option.value = currency;
    option.text = currenciesJSON[currency].name;
    select_currency.appendChild(option);
  }

  var td_right = document.createElement('td');
  td_right.setAttribute('class', 'paddingtd');
  td_right.appendChild(select_currency);

  var tr = document.createElement('tr');
  tr.id = 'trCurrency' + count_currencies;
  tr.appendChild(td_left);
  tr.appendChild(td_right);

  var container = document.getElementById('currency');
  container.appendChild(tr);

  changeVisibilityRemove(true);

  if (!init) {
    localStorage.setItem('currency' + count_currencies, '');
    count_currencies++;
    update(0);

    if (count_currencies == MAX_CURRENCIES) changeVisibilityAdd(false);
  }
}

function removeCurrency() {
  if (count_currencies <= MIN_CURRENCIES) return;

  count_currencies--;
  localStorage.removeItem('currency' + count_currencies);
  var container = document.getElementById('currency');

  container.removeChild(
    document.getElementById('trCurrency' + count_currencies)
  );

  if (count_currencies < MAX_CURRENCIES) changeVisibilityAdd(true);

  if (count_currencies <= MIN_CURRENCIES) changeVisibilityRemove(false);
}

function changeVisibilityAdd(visible) {
  document.getElementById('btnAdd').disabled = !visible;
}

function changeVisibilityRemove(visible) {
  document.getElementById('btnRemove').disabled = !visible;
}





