describe('calculator.js', function () {

  describe('Calculator', function () {
      let calculator;
      let calculator2;
    beforeEach(function () {
      calculator = new Calculator();
      calculator2=  new Calculator();
    })
    /* toBe:
    comparison between expect(actual value) toBe(expected value)
  
    when object is compared, it will compare their memory locations
    */
    /*
    toEqual: deep comparison
    should keys and values be the same
    */
    it('can be instantiated', function () {
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
      expect(calculator.constructor.name).toContain('Cal');
    });

    it('instantiates unique object', function () {

      expect(calculator).not.toBe(calculator2);
    });

    it('has common operations', function () {
      expect(calculator.add).toBeDefined();
      expect(calculator.subtract).toBeDefined();
      expect(calculator.multiply).toBeDefined();
      expect(calculator.divide).toBeDefined();
    });

    it('can overwrite total', function () {
      calculator.total = null;
      expect(calculator.total).toBeNull();
    });
    
    it('should initialize the total', function () {
      expect(calculator.total).toBe(0);
      expect(calculator.total).toBeFalsy();
    });

    describe('add()', function () {
      it('should add numbers to total', function () {
        calculator.add(5);

        expect(calculator.total).toBe(5);
      });
      it('returns total', function () {
        calculator.total = 10;
        expect(calculator.add(50)).toBe(60);
        expect(calculator.total).toMatch(/-?\d+/);
        // expect(typeof calculator.total).toMatch('number')
        expect(calculator.total).toBeNumber(); //third party matchers
        expect(function () {}).toEqual(
          jasmine.anything()
        ); /* will fail with expect value of null or undefined*/
      });
    });

    describe('subtract()', function () {
      it('should subtract numbers from total', function () {
        calculator.total = 10;
        calculator.subtract(5);
        expect(calculator.total).toBe(5);
      });
    });

    describe('multiply()', function () {
      it('should multiply total by number', function () {
        calculator.total = 20;
        calculator.multiply(5);
        expect(calculator.total).toBe(100);
      });
      it('does not handle NaN', function () {
        calculator.multiply('a');
        expect(calculator.total).toBeNaN();
      });
    });

    describe('divide()', function () {
      it('should divide total by number', function () {
        calculator.total = 50;
        calculator.divide(10);
        expect(calculator.total).toBe(5);
      });
      it('handles divide by zero', function () {
        calculator.total = 10;
        expect(function () {
          calculator.divide(0);
        }).toThrow();
        expect(function () {
          calculator.divide(0);
        }).toThrowError(Error, 'Can not divide by zero');
      });
    });

  });
});
