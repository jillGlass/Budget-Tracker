var budgetController = (function() {})();

var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: ".add__btn"
    }
  
    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMStrings.inputType).value, //will be inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
           
        },
        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();

//global app controller to control UIController and budgetController functions
var controller = (function(budgetCtrl, UICtrl) {

    var setUpEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function(event) {
          if (event.keyCode === 13 || event.which === 13) {
              ctrlAddItem()
          }
        });
    };

    
  var ctrlAddItem = function() {
    //1. Get the filed input data
    var input = UICtrl.getInput()
    console.log(input)
    //2. Add the item to the budget controller

    //3. Add the item to the user interface

    //4. Calculate budget

    //5. Display budget on user interface

    
  };
return {
    init: function() {
        setUpEventListeners()
    }
}

  
})(budgetController, UIController);

controller.init()