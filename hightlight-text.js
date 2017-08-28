function HightlightText(word, element) {
	var rgxp = new RegExp(word, 'gi');
	var repl = '<span class="hightlight">' + word + '</span>';
	element.innerHTML = element.innerHTML.replace(rgxp, repl);
}