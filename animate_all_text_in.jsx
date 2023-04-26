{
	function addTextAnimation(comp) {
	    for (var i = 1; i <= comp.layers.length; i++) {
		var layer = comp.layers[i];
    
		if (layer instanceof TextLayer) {
		    var startTime = layer.inPoint;
		    var endTime = startTime + 0.3;
    
		    // Add position animation
		    var positionProp = layer.property("Position");
		    var initPosValue = positionProp.value;
		    var startPos = [initPosValue[0], initPosValue[1] + 400];
		    var endPos = initPosValue;
    
		    positionProp.setValueAtTime(startTime, startPos);
		    positionProp.setValueAtTime(endTime, endPos);
    
		    var positionKey1 = positionProp.nearestKeyIndex(startTime);
		    var positionKey2 = positionProp.nearestKeyIndex(endTime);
    
		    // Set influence values for a logarithmic-like curve
		    positionProp.setTemporalEaseAtKey(positionKey1, [new KeyframeEase(0.3, 90)], [new KeyframeEase(0.3, 10)]);
		    positionProp.setTemporalEaseAtKey(positionKey2, [new KeyframeEase(0.3, 90)], [new KeyframeEase(0.3, 10)]);
    
		    // Add opacity animation
		    var opacityProp = layer.property("Opacity");
    
		    opacityProp.setValueAtTime(startTime, 0);
		    opacityProp.setValueAtTime(endTime, 100);
    
		    var opacityKey1 = opacityProp.nearestKeyIndex(startTime);
		    var opacityKey2 = opacityProp.nearestKeyIndex(endTime);
    
		    // Set influence values for a logarithmic-like curve
		    opacityProp.setTemporalEaseAtKey(opacityKey1, [new KeyframeEase(0.3, 90)], [new KeyframeEase(0.3, 10)]);
		    opacityProp.setTemporalEaseAtKey(opacityKey2, [new KeyframeEase(0.3, 90)], [new KeyframeEase(0.3, 10)]);
		}
	    }
	}
    
	var currentComp = app.project.activeItem;
    
	if (currentComp instanceof CompItem) {
	    app.beginUndoGroup("Add Text Animation");
	    addTextAnimation(currentComp);
	    app.endUndoGroup();
	} else {
	    alert("Please select a composition.");
	}
    }
    