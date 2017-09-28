// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var result = [];
  function elementFinder(base) {
    var baseChildren = base.childNodes;
    if(base.classList !== undefined && base.classList.contains(className)) {
      result.push(base);
    }
    if(baseChildren !== undefined) {
    	for(var child in baseChildren) {
      	elementFinder(baseChildren[child]);
      }
    }
    return result;
  }
  return elementFinder(document.body);
};