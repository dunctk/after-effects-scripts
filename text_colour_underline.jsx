{
	function createShapeLayer(textLayer, width, color) {
	    var shapeLayer = textLayer.containingComp.layers.addShape();
	    shapeLayer.name = "Horizontal Line";
	    shapeLayer.moveAfter(textLayer);
    
	    var contents = shapeLayer.property("Contents");
	    var shapeGroup = contents.addProperty("ADBE Vector Group");
    
	    var shapeRect = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
	    var shapeFill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    
	    shapeFill.property("ADBE Vector Fill Color").setValue(color);
    
	    var textWidth = textLayer.sourceRectAtTime(textLayer.inPoint, false).width;
	    shapeLayer.property("Scale").setValue([textWidth, 5]);

	    // Set the in and out points of the shape layer to match the text layer
	    shapeLayer.inPoint = textLayer.inPoint;
	    shapeLayer.outPoint = textLayer.outPoint;
    
    
	    return shapeLayer;
	}

	function applyAnimation(shapeLayer) {
		// Animate in/out effect
		var duration = 0.2;
		var yOffset = 30;
	    
		var positionProp = shapeLayer.property("Position");
		var opacityProp = shapeLayer.property("Opacity");
	    
		// Add keyframes for position and opacity
		positionProp.addKey(shapeLayer.inPoint);
		positionProp.addKey(shapeLayer.inPoint + duration);
		positionProp.addKey(shapeLayer.outPoint - duration);
		positionProp.addKey(shapeLayer.outPoint);
	    
		opacityProp.addKey(shapeLayer.inPoint);
		opacityProp.addKey(shapeLayer.inPoint + duration);
		opacityProp.addKey(shapeLayer.outPoint - duration);
		opacityProp.addKey(shapeLayer.outPoint);
	    
		positionProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR);
		positionProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.LINEAR);
	    
		positionProp.setValueAtTime(shapeLayer.inPoint, [shapeLayer.transform.position.value[0], shapeLayer.transform.position.value[1] - yOffset]);
		positionProp.setValueAtTime(shapeLayer.inPoint + duration, shapeLayer.transform.position.value);
	    
		opacityProp.setValueAtTime(shapeLayer.inPoint, 0);
		opacityProp.setValueAtTime(shapeLayer.inPoint + duration, 100);
	    
		positionProp.setValueAtTime(shapeLayer.outPoint - duration, shapeLayer.transform.position.value);
		positionProp.setValueAtTime(shapeLayer.outPoint, [shapeLayer.transform.position.value[0], shapeLayer.transform.position.value[1] - yOffset]);
	    
		opacityProp.setValueAtTime(shapeLayer.outPoint - duration, 100);
		opacityProp.setValueAtTime(shapeLayer.outPoint, 0);
	    }
    
	function randomizeLineColor(comp) {
	    var colors = [
		[106, 53, 255],
		[255, 159, 89],
		[251, 103, 150],
		[70, 211, 154],
		[248, 217, 161],
		[167, 229, 182]
	    ].map(function(c) { return c.map(function(x) { return x / 255; }); });
    
	    for (var i = 1; i <= comp.layers.length; i++) {
		var layer = comp.layers[i];
    
		if (layer instanceof TextLayer) {
		    var randomColorIndex = Math.floor(Math.random() * colors.length);
		    var randomColor = colors[randomColorIndex];
    
		    var lineWidth = 800; // Set the line width to 800 pixels
		    var lineHeight = 5;
		    var lineLayer = createShapeLayer(layer, lineWidth, randomColor);
    
		    var initPosValue = layer.property("Position").value;
		    var linePos = [initPosValue[0], initPosValue[1] + layer.sourceRectAtTime(layer.inPoint, false).height / 2 + lineHeight / 2];
		    lineLayer.property("Position").setValue(linePos);

		    applyAnimation(lineLayer);
		}
	    }
	}
    
	var currentComp = app.project.activeItem;
    
	if (currentComp instanceof CompItem) {
	    app.beginUndoGroup("Randomize Line Color");
	    randomizeLineColor(currentComp);
	    app.endUndoGroup();
	} else {
	    alert("Please select a composition.");
	}
    }
    
    