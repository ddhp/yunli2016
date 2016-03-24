// inject sinon to client side
casper.options.clientScripts.push('node_modules/sinon/pkg/sinon-1.7.3.js');

// add appendChildToContainer in client 
casper.on('page.initialized', function () {
  casper.evaluate(function () {
    window.appendChildToContainer = function appendChildToContainer(msg) {
      var node = document.createElement('p');
      var textnode = document.createTextNode(msg);
      node.appendChild(textnode);
      document.querySelector('.container').appendChild(node);
    };

    window.mixpanel = {
      // mock mixpanel object
      identify: function () {},
      letsTrack: function () {},
      alias: function () {},
      people: {
        set: function () {}
      },
      track: function (name, properties, cb) {
        // execute cb, b/c some behavior is done after event tracking
        cb();
      },
      time_event: function() {}
    };
  });
});

casper.on('step.complete', function () {
  // casper.evaluate(function () {
  //   appendChildToContainer(window.__coverage__);
  // });
  // casper.capture('.casperjs-capture/test1.png');
});

// // bind function
// casper.on('page.initialized', function(){
//   this.evaluate(function(){
//     var isFunction = function(o) {
//       return typeof o == 'function';
//     };
//
//     var bind,
//         slice = [].slice,
//         proto = Function.prototype,
//         featureMap;
//
//     featureMap = {
//       'function-bind': 'bind'
//     };
//
//     function has(feature) {
//       var prop = featureMap[feature];
//       return isFunction(proto[prop]);
//     }
//
//     // check for missing features
//     if (!has('function-bind')) {
//       // adapted from Mozilla Developer Network example at
//       // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
//       bind = function bind(obj) {
//         var args = slice.call(arguments, 1),
//             self = this,
//             nop = function() {
//             },
//             bound = function() {
//               return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
//             };
//         nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
//         bound.prototype = new nop();
//         return bound;
//       };
//       proto.bind = bind;
//     }
//   });
// });
