// Storage Controller


// Item Controller-------------------------------
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  const x = 20;

  // Data Structure  / State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 }

    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {

    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      // Create ID
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item object
      newItem = new Item(ID, name, calories);
      // Add item object to items array
      data.items.push(newItem);
      return newItem;
    },

    logData: function () {
      return data;
    }
  }
})();

// UI Controller ------------------------------
const UICtrl = (function () {
  // Selectors Object
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  // Public methods
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong>
        <em>${item.calories} Calories</em>
        <a href="" class="secondary-content">
          <i class="edit-item fas fa-pen"></i></a>
      </li>
        `;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: function (item) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong>
      <em>${item.calories} Calories</em>
      <a href="" class="secondary-content">
        <i class="edit-item fas fa-pen"></i></a>
      `;

      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App Controller ----------------------------------
const App = (function (ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form Input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calories
    if (input.name !== '' && input.calories !== '') {

      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();

    }
  }
})(ItemCtrl, UICtrl);

// Initialize
App.init();