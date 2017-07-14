var popupList = document.getElementById('popup-list'); 
var popup = new Popup(popupList);
var open = document.getElementsByClassName('open-popup');

function contentPopup(dVerbs){
var itemsArray = dVerbs;
var html = '<div class="popup-block">';
 	html += '<div class="popup-block">' +
 	//Name block
 	'<div id="verb-name">' + itemsArray[0].name + '</div>' +
     '<div id="verb-phonetic">' + itemsArray[0].phonetic + '</div>' +
     '</diV>' +
     //Definition block
     '<div class="popup-block">' +
 	'<em>Definition</em>' +
     '<div id="verb-definition">' + itemsArray[0].definition + '</div>' +
     '</diV>' +
     //Example block
     '<div class="popup-block">' +
 	'<em>Example sentence</em>' +
     '<div id="verb-example">' + itemsArray[0].example + '</div>' +
     '</diV>' +
     //Synonymous block
     '<div class="popup-block">' +
     '<em>Synonymous</em>' +
     '<div id="verb-synonymous">' + itemsArray[0].synonymous + '</div>' +
     '</diV>' +
     '</div>'; 
	document.getElementById('popup-body').innerHTML = html;
}
function openPopup(){
	for ( var i = 0; i < open.length; i++ ) (function(i){
	var currentId = open[i].id;
	  open[i].onclick = function() {
	    currentId;
		var result = pverbs.filter(function(item){
		    	return 'item-list-'+item.id == currentId;
		});
		contentPopup(result)
		popup.open();
	  }
	})(i);
}
window.onload = openPopup();