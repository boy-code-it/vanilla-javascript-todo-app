
# Vanilla Javascript Todo App
Vanilla Javascript Todo App, Scaleable App Architecture Style

## With Confidence
You can be confident about this code, because it has been tested. The tests are in *test/test.js*. You run the specification with an HTML page: *test/specification.html*.

## Answers

The app is based on three layers:
- Base
- Core
- Sandbox
- Module(s)

### Base
The Base is a DOM library. Any will do. In this case, you are using Jquery. This layer provides DOM, events, AJAX, and more to the fundamental capabilites of your app.

### Core
An object. It lets you use the Base in an app. The Core knows about the Base. In other words, it uses the Base, directly and not just.

  var CORE = {
    doSomething: function () {
      Base.method();
      ...
    }
  };
### Sandbox
An object. It is an interface for Module's to use, to get elements out of the DOM and do something with them. Its methods are *find*, *listen* and *notify*.

### Module
Modules. A module is a single part of an entire app. Each module has an *init* method and a *destroy* method -- what the Core has to do, when a new Module's is created and/or destroyed, or created, or destroyed.

  CORE.create('search-box', function (sandbox) {
    var _sandbox = sandbox;
    
    return {
      init: function () {
        _sandbox.find('search-box');
        ...
      },
      destroy: function () {
        _sandbox = null;
      }
    };
  });
