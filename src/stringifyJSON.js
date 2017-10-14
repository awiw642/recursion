// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var objType = typeof obj;
	if(objType === "function" || objType === "undefined") {
  	return undefined;
  }
  else if(typeof obj === "string") {
  	return "\"" + obj + "\"";
  }
  else if(typeof obj === "number" || typeof obj === "boolean") {
  	return obj.toString();
  }
  else if(!obj) {
  	return "null";
  }
  else {
  	if(Array.isArray(obj)) {
    	var arrayContainer = [];
    	for(var item in obj) {
      	arrayContainer.push(stringifyJSON(obj[item]));
      }
      return "[" + arrayContainer.join() + "]"
    }
    else {
    	var objectContainer = [];
      for(var item in obj) {
      	var stringifyKey = stringifyJSON(item);
        var stringifyValue = stringifyJSON(obj[item]);
        if(stringifyValue !== undefined) {
        	objectContainer.push(stringifyKey + ":" + stringifyValue);
        }
      }
      return "{" + objectContainer.join() + "}"
    }
  }
};
