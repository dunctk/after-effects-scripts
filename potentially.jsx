// Create a new composition with text layers
var comp = app.project.items.addComp("New Comp", 1920, 1080, 1, 120, 30);

// Set the start time to 0
var time = 0;

// Define the text content and durations
var textContents = [
  "potential.ly",
  "Hi, we’re Potential.ly",
  "We’re the skills platform",
  "Behind the Digital Discovery Tool",
  "In this short video we want to share with\nyour some of the other brilliant things ...\nYou can do with potential.ly, if you get your own platform licence",
  "potential.ly\nWhat else can you do...",
  "1 Survey & Assessment Reports",
  "You can make your own Skills Audits...\nSurveys are easy to build...\nReports are automatically personalised for every test taker...\nYou can build complex tools... Like Jisc DT\nWith DT Jisc have taken our capabilities to the next level with DT running x surveys targeted at 10 different audiences... automatically configuring resources, feeding into benchmarking dashboards...",
  "Platform even comes pre-built with fantastic personal development tools like [pi} Indicator",
  "These playlists that you see on Jisc...\nWell you can build your own!",
  "Perfect for ...short staff training courses... Co-curricular activities Skills Awards programmes Library Training Employability training Digital skills development Executive Education",
  "Perfect for ... Career services to deliver\nCo-curricular activities Skills Awards programmes Employability training",
  "Perfect for ... Library services Wellbeing Student support",
  "It’s all done with a super-simple Editor that takes no time to figure out\nEasily add interactive elements Like quizzes Reflection forms\nOr Timelogs\nVideos Images Or...\nAny of the 3rd party tools you love...\nAnd best of all these playlists can be easily embedded right into your VLE\nAllowing you to create simple and seamless journeys\nwhoever your learners are.\nStudents...... Or staff.",
  "potential.ly is optimised for self-directed learning and development journeys\nAlways guiding the learner along\nWe’re already powering Career Readiness and Employability journeys across the UK",
  "But universities are also using our platform to develop staff...\nAnnual Performance Development Review?\nPDR... fully digital experience? Friendly?\nIntuitive?\nReady for Data Analytics?\nHere we go...\nStaff development and PDRs... They don’t have to be tedious. Just use potential.ly",
  "Oh yes... EVERY learner gets their own personal learning environment.\nWhich includes a shareable digital skills wallet.\nThis platform is so neat, we should get a badge for that.\nWell with potential.ly we can.",
  "Hey we go...\nThere is a badge for that.",
  "And there is so much more...\nWell if you want to find out about the must-have digital solution that will transform your Teaching and Learning, Improve staff and student engagement and allow you to report on whatever you want to report on...\nGet in touch and find out, what else you can do..."
];
var durations = [
  2.5,
  2.5,
  2.5,
  2.5,
  2.5,
  5,
  2.5,
  2.5,
  10,
  2.5,
  5,
  7.5,
  2.5,
  2.5,
  17.5,
  10,
  2.5,
  7.5,
  12.5,
  17.5,
  12.5,
  2.5,
  7.5,
  12.5,
  10,
  7.5,
  15,
  10,
  2.5,
  2.5,
  12.5,
  7.5,
  10,
  7.5,
  7.5,
  10,
  10,
  2.5,
  12.5,
  17.5,
  10,
  7.5
  ];
  
// Set the font name and style
var fontName = "DM Sans";
var fontStyle = "Regular";

// Loop through the text contents and create text layers
for (var i = 0; i < textContents.length; i++) {
  // Check if the text content is not "Next slide"
  if (textContents[i] !== "Next slide") {
    // Add a new text layer to the composition with the current text content
    var textLayer = comp.layers.addText(textContents[i]);
    // Set the font family and style of the text layer
    var textProperty = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    textProperty.font = fontName;
    textProperty.fontStyle = fontStyle;
    // Set the in point and out point of the text layer
    textLayer.inPoint = time;
    textLayer.outPoint = time + durations[i];
    // Move the time cursor to the end of the current text layer
    time += durations[i];
  }
}

// Fit the composition to the duration of the last text layer
comp.duration = time;

// Center the composition in the viewport
comp.parentFolder = app.project.rootFolder;
comp.layer(1).position.setValue([comp.width/2, comp.height/2]);

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
		    var startPos = [initPosValue[0], initPosValue[1] + 200];
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
    
	var currentComp = comp;
    
	if (currentComp instanceof CompItem) {
	    app.beginUndoGroup("Add Text Animation");
	    addTextAnimation(currentComp);
	    app.endUndoGroup();
	} else {
	    alert("Please select a composition.");
	}
    }
    
    
    
    


