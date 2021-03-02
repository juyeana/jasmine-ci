describe('main.js', function () {
  describe('calculate', () => {
    it('validates expression when the second number is invalid', function () {
      spyOn(window, 'updateResult').and.stub();
      // and.stub() is default so it can be omitted
      calculate('1+a');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        'Expression not recognized'
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when the first number is invalid', function () {
      spyOn(window, 'updateResult');
      calculate('a+1');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        'Expression not recognized'
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when the operator is invalid', function () {
      spyOn(window, 'updateResult');
      calculate('1_2');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        'Expression not recognized'
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('calls add', function () {
      spyOn(Calculator.prototype, 'add');
      // const spy = spyOn(Calculator.prototype, 'add');
      calculate('3+4');
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      // expect(spy).toHaveBeenCalledTimes(2)
      // expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(4);
    });

    it('calls subtract', function () {
      spyOn(Calculator.prototype, 'subtract');
      calculate('3-4');
      expect(Calculator.prototype.subtract).toHaveBeenCalled();
      expect(Calculator.prototype.subtract).toHaveBeenCalledWith(4);
    });

    it('calls multiply', function () {
      spyOn(Calculator.prototype, 'multiply');
      calculate('3*7');

      expect(Calculator.prototype.multiply).toHaveBeenCalled();
      expect(Calculator.prototype.multiply).toHaveBeenCalledWith(7);

      expect(Calculator.prototype.multiply).not.toHaveBeenCalledWith(3);
    });

    it('calls divide', function () {
      const spy = spyOn(Calculator.prototype, 'divide');
      calculate('3/2');
      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(2);
    });

    // when a specific function needs to be executed
    it('calls updateResult (example using and.callThrough)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });
    // callFake() - when you need custom implementation
    it('calls updateResult (example using and.callFake)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(function (num) {
        return 'it works';
      });
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');
    });
    // returnValue() - specify your own return value
    it('calls updateResult (example using and.returnValue)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue(
        'whatever [multiply] returns'
      );
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        'whatever [multiply] returns'
      );
    });
    it('calls updateResult (example using and.returnValues)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(
        null,
        'whatever [add] returns'
      );
      calculate('5+5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        'whatever [add] returns'
      );
    });

    it('does not handle errors', function () {
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');
      // calculate(5*5)
      expect(function () {
        calculate('5*4');
      }).toThrowError('some error');
    });
  });

  describe('updateResult', function () {
    // let element
    beforeAll(function () {
      const element = document.createElement('div');
      element.setAttribute('id', 'result');
      document.body.appendChild(element);
      this.element = element;
    });
    afterAll(function () {
      // const element = document.getElementById('result');
      document.body.removeChild(this.element);
    });
    it('adds result to DOM element', function () {
      updateResult('5');

      expect(this.element.innerHTML).toBe('5');
    });
  });

  describe('showVersion', function () {
    it('calls calculator.version', function () {
      spyOn(document, 'getElementById').and.returnValue({ innerText: null });
      // debugger;
      const spy = spyOnProperty(Calculator.prototype, 'version', 'get');
      showVersion();
      expect(spy).toHaveBeenCalled();
    });
  });
});
