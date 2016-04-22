var tmp = null;

function test(description, callback) {
    console.log(description);
    callback();
}

function it(description, callback) {
    console.log('\t' + description);
    callback();
}

function ok(condition, description) {
        var result = (condition)? 'PASS: ' + description: 'FAIL: ' + description;
        console.log('\t\t' + result);  
}

function notOk(condition, description) {
        var result = (!condition)? 'PASS: ' + description: 'FAIL: ' + description;
        console.log('\t\t' + result);  
}

function expect(value1) {
    return {
        toBe: function (value2) {
            var result = (value1 === value2)? 'PASS: [toBe]': 'FAIL: [toBe]';
            console.log('\t\t' + result);             
        },
        notToBe: function (value2) {
            var result = (value1 !== value2)? 'PASS: [toBe]': 'FAIL: [toBe]';
            console.log('\t\t' + result);  
        }
    };
}

function methodSpy(object, method) {
    
    tmp = object[method];
    
    function spy() {
      spy.calls = spy.calls + 1;
      spy.called = true;
        
    }
    
    spy.calls = 0;
    spy.called = false;
    
    object[method] = spy;
    
    return spy;
}



