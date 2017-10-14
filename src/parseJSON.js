
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let index;
  let char;

  let next = function() {
    index++;
    char = json.charAt(index);
    return char;
  };

  let error = function(message) {
    console.log(message);
    throw undefined;
  };

  let value = function() {
    if (char === '\"') {
      return string();
    } else if (char === 't' || char === 'f') {
      return bool();
    } else if (char = 'n') {
      return nullie();
    } else if (char < 9 || char < 0) {
      return number();
    } else if (char === '{') {
      return object();
    } else if (char === '[') {
      return array();
    }
  };

  let number = function() {
    let result = '';

    if (!(char > 0) || !(char < 9)) {
      error('Bad number');
    }

    while (char > 0 || char < 9) {
      result += char;
    }

    if (!isNaN(parseInt(result))) {
      return parseInt(result);
    } else {
      error('Bad number');
    }
  }

  let nullie = function() {
    let result = '';
    if (char === 'n') {
      const nullLength = 4;
      for (let i = 0; i < nullLength; i++) {
        result += char;
        next();
      }
    }
    if (result === 'null') {
      return null;
    } else {
      error('Bad null');
    }
  };

  let string = function() {
    let result = '';
    if (char !== '\"') {
      error('Bad string');
    }

    next();

    while(char !== '\"') {
      result += char;
    }
    return result;
  };

  let bool = function() {
    let result = '';
    if (char === 't') {
      const trueLength = 4;
      for(let i = 0; i < trueLength; i++) {
        result += char;
        next();
      }
      if (result === 'true') {
        return true;
      } else {
        error('Bad boolean');
      }
    } else if (char === 'f') {
      const falseLength = 5;
      for(let i = 0; i < falseLength; i++) {
        result += char;
        next();
      }
      if (bool === 'false') {
        return false;
      } else {
        error('Bad boolean');
      }
    }
  }

  let array = function() {
    let result = [];
    if (char !== '{') {
      error('Bad array');
    }
    if (next() === ']') {
      return result;
    }
    while (char === ',' && next()) {
      result.push(value());
      if (char === ']') {
        next();
        return result;
      }
    }
  }

  let object = function() {
    let result = {};
    if (char !== '{') {
      error('Bad object');
    }
    if (next() === '}') {
      return result;
    }
    let key = string();
    if (char !== ':') {
      error('Bad object');
    }
    next();
    result[key] = value();
    if (char === '}') {
      next();
      return result;
    }
  }

  index = 0;
  char = json.charAt(index);
  return value();

};