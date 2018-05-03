function _(element) {

  var functionMethods = [
    'isElement', 'isArray', 'isObject', 'isFunction',
    'isBoolean', 'isString', 'isNumber'
  ]

  functionMethods.forEach(function(method) {
    _[method] = function(el) {
      return _()[method](el);
    };
  });

  return {
    isElement: function(el) {
      return el.nodeType === 1;
    },

    isArray: function(el) {
      return Array.isArray(el);
    },

    isObject: function(el) {
      return typeof el === 'object' || typeof el === 'function';
    },

    isFunction: function(el) {
      return typeof el === 'function';
    },

    isBoolean: function(el) {
      return typeof el === 'boolean' || el instanceof Boolean;
    },

    isString: function(el) {
      return typeof el === 'string' || el instanceof String;
    },

    isNumber: function(el) {
      return typeof el === 'number' || el instanceof Number;
    },

    first: function() {
      return element[0];
    },

    last: function() {
      return element[element.length - 1];
    },

    without: function() {
      var elementsToRemove = Array.prototype.slice.call(arguments);
      return element.filter(function(e) {
        return !elementsToRemove.includes(e);
      });
    },

    range: function() {
      var newRange = [];

      if (arguments[0] && arguments[1]) {
        for (var i = arguments[0]; i <= arguments[1]; i += 1) {
          newRange.push(i);
        }
      } else if (arguments[0] && !arguments[1]) {
        for (var i = 0; i <= arguments[0]; i += 1) {
          newRange.push(i);
        }
      }

      return newRange;
    },

    lastIndexOf: function(target) {
      var index = -1;

      element.forEach(function(e, idx) {
        if (target === e) index = idx;
      });

      return index;
    },

    sample: function(quantity) {
      var results = [];
      var randomElement;

      function randomIdx() {
        return Math.floor(Math.random() * element.length);
      }

      if (!arguments[0]) {
        return element[randomIdx()];
      } else {
        for (var i = 0; i < quantity; i += 1) {
          randomElement = element[randomIdx()];
          if (results.includes(randomElement)) {
            i -= 1;
          } else {
            results.push(randomElement);
          }
        }
      }

      return results;
    },

    findWhere: function(target) {
      for (var i = 0; i < element.length; i += 1) {
        var match = true;

        for (var prop in target) {
          if (target[prop] !== element[i][prop]) match = false;
        }

        if (match) return element[i];
      }
    },

    where: function(target) {
      var results = [];

      for (var i = 0; i < element.length; i += 1) {
        var match = true;

        for (var prop in target) {
          if (target[prop] !== element[i][prop]) match = false;
        }

        if (match) results.push(element[i]);
      }

      return results;
    },

    pluck: function(property) {
      return element.map(function(obj) {
        return obj[property];
      }).filter(function(e) {
        return e !== undefined;
      });
    },

    keys: function() {
      return Object.keys(element);
    },

    values: function() {
      return Object.values(element);
    },

    extend: function() {
      var mainObject = arguments[0];
      var otherObjects = Array.prototype.slice.call(arguments, 1);

      otherObjects.forEach(function(obj) {
        var keys = Object.keys(obj);
        keys.forEach(function(key) {
          mainObject[key] = obj[key];
        });
      });

      return mainObject;
    },

    pick: function() {
      var newObj = {};
      var properties = Array.prototype.slice.call(arguments);

      properties.forEach(function(prop) {
        if (element[prop]) newObj[prop] = element[prop];
      });

      return newObj;
    },

    omit: function() {
      var newObj = {};
      var propertiesToRemove = Array.prototype.slice.call(arguments);
      var sourceObjProperties = Object.keys(element);

      sourceObjProperties.forEach(function(prop) {
        if (!propertiesToRemove.includes(prop)) {
          newObj[prop] = element[prop];
        }
      });

      return newObj;
    },

    has: function(prop) {
      return element[prop];
    },
  }
}
