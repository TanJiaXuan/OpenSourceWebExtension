function byId(id) {
	return document.getElementById(id);
}

function doSearch(word) {
	if (!word) return;
	word = word.replace(/[\r\n ]+/g, " ");
	if (!word || word.length > 70) return;
	browser.tabs.create({
		"url": "https://www.thefreedictionary.com/_/search.aspx?word=" + encodeURIComponent(word)
	});
	window.close();
}

window.onload = function () {

	var sbe = byId('inputText');
	setTimeout(function () {
		sbe.focus();
	}, 100);

	sbe.onkeypress = function (ev) {
		if (ev.keyCode == 13) doSearch(sbe.value);
	};

	byId('searchBtn').onclick = function () {
		doSearch(sbe.value);
	};

	var dcl = byId('cbOpenOnDblClick');
	dcl.checked = localStorage["dblclickOff"] != 1;
	dcl.onclick = function () {
		localStorage["dblclickOff"] = dcl.checked ? 0 : 1;
	}
};

