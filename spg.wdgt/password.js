//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    setupParts();
    
    if(window.widget)
    {
        var letters = widget.preferenceForKey("letters");
        if (letters == undefined) {
            letters = true;
        }
        var numbers = widget.preferenceForKey("numbers");
        if (numbers == undefined) {
            numbers = true;
        }
        var others = widget.preferenceForKey("others");
        if (others == undefined) {
            others = false;
        }
        
        var othersChars = widget.preferenceForKey("otherChars");
        if (othersChars == undefined) {
            othersChars = "[]()+=-'\"&*$%";
        }
    
        var defaultLength = widget.preferenceForKey("length");
        if (defaultLength == undefined) {
            defaultLength = 8;
        }
        
        document.getElementById("lengthFld").value = defaultLength;
        document.getElementById("othersFld").value = othersChars;
        document.getElementById("letters").checked = letters;
        document.getElementById("numbers").checked = numbers;
        document.getElementById("others").checked = others;
    }
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}


function generate(event)
{
    var length = parseInt(document.getElementById("lengthFld").value);
    if (isNaN(length) || length < 1) {
        return;
    }

	var content = "";
    var keys = "";
	if (document.getElementById("letters").checked) {
		keys += "abcdefghijklmnopqrstuvwxyz";
        keys += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if (document.getElementById("numbers").checked) {
        keys += "0123456789";
	}
	if (document.getElementById("others").checked) {
        keys += document.getElementById("othersFld").value;
	}
    
	for (i = 1; i <= length; i++) {content += keys.charAt(Math.round(Math.random()*keys.length));}
    document.getElementById("passwordFld").value = content;
    
    document.getElementById("passwordFld").focus();
    document.getElementById("passwordFld").select();
}


function saveState(event)
{
    if(window.widget) 
    {
        widget.setPreferenceForKey(document.getElementById("othersFld").value, "otherChars");
        widget.setPreferenceForKey(document.getElementById("lengthFld").value, "length");
        widget.setPreferenceForKey(document.getElementById("letters").checked, "letters");
        widget.setPreferenceForKey(document.getElementById("numbers").checked, "numbers");
        widget.setPreferenceForKey(document.getElementById("others").checked, "others");
    }
}
