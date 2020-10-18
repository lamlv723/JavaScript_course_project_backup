//  BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function (id, description, value) { // function constructor
        this.id = id; //this.id<< là thuộc tính của obj, id>> là tham số truyền vào
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        } // Vì sao ko return ở đây???
    };


    Expense.prototype.getPercentage = function () { // storage the percentage
        return this.percentage;
    };


    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1,
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    return { // public method
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

        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== 1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // calculate total
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate budget 
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        
        calculatePercentages: function() {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc)
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
        },

        testing: function() {
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            // 1. Tạo dòng html để thêm vào mỗi item
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value"> %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // 2. Change value, des, id
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // 3. Thêm vào DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            var el;
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = ""; // value property
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
           // tự làm 1 forEach cho nodeList (nodeList ko có property forEach)
            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        getDOMstrings: function() {
            return DOMstrings;
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function () {
        // 1. calc the budget
        budgetCtrl.calculateBudget();
        // 2. Return budget
        var budget = budgetCtrl.getBudget();
        // 6. display to UI
        UICtrl.displayBudget(budget); 
    };

    var updatePercentage = function () {
        // 1. calc the percentage
        budgetCtrl.calculatePercentages();
        // 2. read it from budget controller????
        var percentages = budgetCtrl.getPercentages();
        // 3. update to the UI
        UICtrl.displayPercentages(percentages);
    },

    ctrlAddItem = function() { // vì sao k cần var????????
        // 1. get data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add item to UI controller
            UICtrl.addListItem(newItem, input.type);
            // 4. clear
            UICtrl.clearFields();
            // 5. update budget
            updateBudget();
            // 6. update percentage
            updatePercentage();
        }
    };

    var ctrlDeleteItem = function (event) { // tạo fnc đây để muốn biết Target Element
        var itemID, splitID, type, ID;
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // 1. delete from the structure
            budgetCtrl.deleteItem(type, ID);
            // 2. delete out of the UI
            UICtrl.deleteListItem(itemID);
            // 3. update budget
            updateBudget();
            // 4. update percentage
            updatePercentage();
        }
    };

    return {
        init: function () {
            console.log('test init!');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,});
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();