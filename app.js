var budgetController = (function() {})();

var UIController = (function() {
  //write code later
})();

//global app controller to control UIController and budgetController functions
var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    //1. Get the filed input data
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
