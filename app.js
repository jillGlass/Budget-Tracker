var budgetController = (function() {})();

var UIController = (function() {
  
    return {
        getInput: function() {

            return {
                type: document.querySelector('.add__type').value, //will be inc or exp
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            }
           
        }
    }
})();

//global app controller to control UIController and budgetController functions
var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    //1. Get the filed input data
    var input = UICtrl.getInput()
    console.log(input)
    //2. Add the item to the budget controller

    //3. Add the item to the user interface

    //4. Calculate budget

    //5. Display budget on user interface
    
    console.log('it works on enter')
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem()
    }
  });
})(budgetController, UIController);
