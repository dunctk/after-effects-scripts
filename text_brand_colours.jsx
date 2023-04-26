// changes the colour of all the text layers to brand colours, randomly

{
	function randomizeTextColor(comp) {
	// brand colours as rgb values
	    var colors = [
		[106, 53, 255],
		[255, 159, 89],
		[251, 103, 150],
		[70, 211, 154],
		[248, 217, 161],
	    ];
    
	    for (var i = 1; i <= comp.layers.length; i++) {
		var layer = comp.layers[i];
    
		if (layer instanceof TextLayer) {
		    var randomColorIndex = Math.floor(Math.random() * colors.length);
		    var randomColor = colors[randomColorIndex].map(function(c) { return c / 255; });
    
		    var textDocument = layer.property("Source Text").value;
		    textDocument.resetCharStyle();
		    textDocument.fillColor = randomColor;
		    layer.property("Source Text").setValue(textDocument);
		}
	    }
	}
    
	var currentComp = app.project.activeItem;
    
	if (currentComp instanceof CompItem) {
	    app.beginUndoGroup("Randomize Text Color");
	    randomizeTextColor(currentComp);
	    app.endUndoGroup();
	} else {
	    alert("Please select a composition.");
	}
    }
    