function showpverbs(pVerbs) {
    var itemsArray = pVerbs;
    var html = '<ul>';
    for (var i = 0; i < itemsArray.length; i++) {
    	html += '<a id="item-list-' + itemsArray[i].id + '" class="open-popup"><li>' +
    	'<span class="name">' + itemsArray[i].name + '</span>' +
    	'<span class="name">' + itemsArray[i].phonetic + '</span>' + 
        '</li></a>'; 
    }; 
    html += '</ul>';
    document.getElementById('myapp-list').innerHTML = html;
    openPopup();
}

window.onload = showpverbs(pverbs);


function filter(currentObject){
	var showAll = currentObject.value == "all";
	if (showAll) {
		var result = pverbs;
	}else{
	    var result = pverbs.filter(function(item){
	    	return item.level == currentObject.value;
	    });
	}
    showpverbs(result);
}

function filterBySearch(){
	var levelObject = document.getElementById('level-filter');
    var searchString = document.getElementById('item-search');
	var searchValue = searchString.value.toLowerCase();

	if (levelObject.value != "all") {
	    var result = pverbs.filter(function(item){
	    	var itemName = item.name.toLowerCase();
	    	return item.level == levelObject.value && itemName.indexOf(searchValue) > -1;
	    });
    }else{
	    var result = pverbs.filter(function(item){
	    	var itemName = item.name.toLowerCase();
	    	return itemName.indexOf(searchValue) > -1;
	    });
   	}
   	showpverbs(result);
}

var change = document.getElementById('item-search');
change.addEventListener("keyup", function() {
	filterBySearch(); 
});

function ClearSearchField() {
    document.getElementById("item-search").value = "";
    filterBySearch();
}


