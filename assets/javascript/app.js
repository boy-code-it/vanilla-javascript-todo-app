var SANDBOX = (function () {
    var _container;
    
    return {
        create: function (name, core) {
                    var _name = name;
                    
                    _container = core.dom.query('#' + name);
                    
                    return {
                        find: function (selector) {
                            return _container.query(selector);
                        },
                        listen: function (name, callback) {
                            core.sub(name, callback);
                        },
                        
                        notify: function (name, data) {
                            core.pub(name, data);
                        }
                    };
                }
            };
} ());

var CORE = (function () {
    
    var _modules = {}, 
        _callbacks = {};
    
    return {
        dom: {
            query: function (selector, context) {
                var result, $els, that = this;
                
                if (context && typeof context.find === 'function') {
                    $els = context.find(selector);
                } else {
                    $els = jQuery(selector);
                }
                
                result = $els.get();
                result.length = $els.length;
                
                result.query = function (selector) {
                    return that.query(selector, $els);
                };
                
                return result;
            }
        },
        
        create: function (name, callback) {
            var module = {
                create: callback,
                instance: null
            };
            
            _modules[name] = module;
        },
        
        start: function (name) {
            var module = _modules[name];
            
            module.instance = module.create(SANDBOX.create(name, this));
            module.instance.init();
        },
        
        stop: function (name) {
            var module = _modules[name];
            
            module.instance.destroy();           
            module.instance = null;
        },
        
        pub: function (name, data) {
            (_callbacks[name] || (_callbacks[name] = []));
            
            for (var index = 0, len = _callbacks[name].length; index < len; index = index + 1) {
                (_callbacks[name][index])(data);
            }
        },
        
        sub: function (name, callback) {
            (_callbacks[name] || (_callbacks[name] = []));
            
            (_callbacks[name]).push(callback);
        }
    };
} ());


CORE.create('item-new', function (sandbox) {
    
    var _sandbox = sandbox,
        _input = sandbox.find('input')[0];
        
    return {
        init: function () {
            var that = this;
        
            _input.onblur = function (e) {
                that.handleClick(e.target.value);
            };
            
            _input.onkeyup = function (e) {
                
                if (e.keyCode === 13) {
                    that.handleClick(e.target.value);
                }
            };
        },
        handleClick: function (data) {
            _sandbox.notify('new-data', data);
        }
    };
});

CORE.start('item-new');

CORE.create('item-list', function (sandbox) {
    var _sandbox = sandbox, 
        _el = _sandbox.find('ul')[0];
    
    return {
        init: function () {
            var that = this;
            
            _sandbox.listen('new-data', function (data) {
                that.handleNotification(data);
            });
        },
        handleNotification: function (data) {
            var line = document.createElement('li'),
                text = document.createTextNode(data);
                
            line.appendChild(text);
            
            _el.appendChild(line);
        }
    };
});

CORE.start('item-list');