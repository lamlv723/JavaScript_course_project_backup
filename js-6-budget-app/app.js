//  BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function (id, description, value) { // function constructor
        this.id = id; //this.id<< là thuộc tính của obj, id>> là tham số truyền vào
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            allExpenses: [],
            allIncome: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // create item
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            }

            // push
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    }
})();


//  UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },
        getDOMstrings: function() {
            return DOMstrings
        }
    }
})();


// APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    var input, newItem;
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function() {
        // 1. get data
        input = UICtrl.getInput();

        // 2. add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value); // <=========

        // 3. add item to UI controller
        // 4. calc the budget
        // 5. display to UI
    };

    return {
        init: function () {
            console.log('test init!');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();