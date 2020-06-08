var budgetController = (function() {
  //create function constructor to handle income and expenses
  var Expense = function(id, description, value) {
    // function constructors start with a capital
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentages = function(totalIncome) {
    if(totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentages = function() {
    return this.percentage;
  }


  var Income = function(id, description, value) {
    // function constructors start with a capital
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;

    data.allItems[type].forEach(function(cur) {
      sum = sum + cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: [],
      inc: [],
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else ID = 0;

      // create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        // exp is received through the type parameter of the addItem function
        var newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        var newItem = new Income(ID, des, val);
      }
      // push it into the data structure according to type
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");
      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur){
        cur.calculatePercentages(data.totals.inc)
      })

    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentages();
      })
      return allPerc
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    deleteItem: function(type, id) {
      var ids, index;

     ids = data.allItems[type].map(function(current) {
        return current.id
      });
      index = ids.indexOf(id);
      if(index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    testing: function() {
      console.log(data);
    },
  };
})();

var UIController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, //will be inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      // insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(
        DOMStrings.inputDescription + "," + DOMStrings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });
      fieldsArray[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

      var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
          callback(list[i], i)
        }
      }
      
      nodeListForEach(fields, function(current, index) {
        // do stuff
        if(percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
        

      })

    },

    getDOMStrings: function() {
      return DOMStrings;
    },
  };
})();

//global app controller to control UIController and budgetController functions
var controller = (function(budgetCtrl, UICtrl) {
  var setUpEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  var updateBudget = function() {
    //1. Calculate budget
    budgetCtrl.calculateBudget();
    //2. Return the budget
    var budget = budgetCtrl.getBudget();
    //3. Display budget on user interface
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // Calculate percentage
    budgetCtrl.calculatePercentages();

    // Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    // Update UI with percentage
    UICtrl.displayPercentages(percentages);
  }

  var ctrlAddItem = function() {
    // function that is called when user hits enter or btn
    var input, newItem;
    //1. Get the filed input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3. Add the item to the user interface
      UICtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      //5. Calculate and update budget
      updateBudget();

      // 6. Calculate and update percent
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    //function that is called when a user hits the delete item button
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
    }
    // delete item from data structure
    budgetCtrl.deleteItem(type, ID);

    //delete item from UI
    UICtrl.deleteListItem(itemID);

    // update budget and show on UI
    updateBudget();

    // calculate and update percent
    updatePercentages();
  };

  return {
    init: function() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
