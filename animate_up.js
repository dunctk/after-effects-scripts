{
	// After Effects script to create a smooth transition animation
	function createSmoothTransition() {
	    // Access the active composition
	    var comp = app.project.activeItem;
	    
	    // Check if the selected item is a composition
	    if (!comp || !(comp instanceof CompItem)) {
		alert('Please select a composition.');
		return;
	    }
	    
	    // Set the desired animation properties
	    var startPositionOffset = [-200, 0];
	    var animationDuration = 0.9;
	    
	    // Begin an undo group for easy reversal of the script
	    app.beginUndoGroup('Create Smooth Transition');
	    
	    // Ensure a layer is selected
	    if (comp.selectedLayers.length === 0) {
		alert('Please select an image layer.');
		app.endUndoGroup();
		return;
	    }
	    
	    // Apply the animation to the selected image layer
	    var imageLayer = comp.selectedLayers[0];
	    var imageLayerPosition = imageLayer.property('Position');
	    
	    // Set keyframes for the animation
	    var startKeyframeTime = comp.time;
	    var endKeyframeTime = comp.time + animationDuration;
	    var startPosition = imageLayerPosition.valueAtTime(startKeyframeTime, true) - startPositionOffset;
	    var endPosition = imageLayerPosition.value;
	    
	    imageLayerPosition.setValueAtTime(startKeyframeTime, startPosition);
	    imageLayerPosition.setValueAtTime(endKeyframeTime, endPosition);
	    
	    // Apply easing to keyframes
	    var easeIn = new KeyframeEase(0.1, 80);
	    var easeOut = new KeyframeEase(0.7, 20);
	    imageLayerPosition.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
	    imageLayerPosition.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	    
	    // End the undo group
	    app.endUndoGroup();
	}
	
	// Run the script
	createSmoothTransition();
    }
    