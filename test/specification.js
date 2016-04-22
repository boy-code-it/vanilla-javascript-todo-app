test('Testing...', function () {
    it('1, 2, 3', function () {
        ok(true, 'Ought to be true');
        notOk(false, 'Ought not be true');
        expect(true).toBe(true);
        expect(false).notToBe(true);
    });
    
    it('4, 5, 6', function () {
        var object = {
            hello: function () {
                console.log('Hello, World!');
            }
        };
        
        var spy = methodSpy(object, 'hello');
        
        expect(spy.calls).toBe(0);
        
        spy();
        
        expect(spy.called).notToBe(false);
    });
});


test('Testing out the CORE', function () {
    it('Ought to have certain properties', function () {
        ok(typeof CORE.dom === 'object', 'Ought to be an object');
        ok(CORE.dom instanceof Object, 'Ought to be an Object\'s instance');
    });
    
    it('Ought to have certain methods', function () {
        ok(typeof CORE.create === 'function', 'Ought to be a function');
        ok(typeof CORE.start === 'function', 'Ought to be a function');
        ok(typeof CORE.stop === 'function', 'Ought to be a function');
    });
});