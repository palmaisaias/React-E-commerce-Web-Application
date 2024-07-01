# Front and Decor E-Commerce Project

This application connects a front-end interface to my e-commerce API from back and core. The application opens on a homepage, and the navigation is provided by a NAV bar at the top of the screen for which I incorporated React Bootstrap.

## Navigation Menu

### 1. Product List

The first item on the menu is the Product List component. This component connects to the backend and fetches the list of products, which are displayed on the screen. The Product List component provides a few options:

- **Add New Product**: 
  - There is a button that allows the addition of a new product, which takes the user to an Add New Product page.
  - Here, you can name the product and set a price.
  - Once the user inputs both name and price, they can select to add the product, which will push this information to the backend and refresh the Product List page to show the newly added product.

- **Delete Product**:
  - Selecting the product gives you the option to delete the product.
  - When the user selects "Delete Product," a modal will populate to confirm the user's action and give them the option to either confirm or cancel.
  - Canceling will simply show the update product screen again, and confirming will delete the product and refresh the Product List page, showing that the product has now been removed.

### 2. Customer List (Members Page)

The second option on the menu is the Customer List or Members Page. This component shows a list of users fetched from the backend database and displays it on the screen. 

- **Customer Details**:
  - The user has the option to select a member, and in doing so, a Customer Details page will populate.
  - This page contains the name, email, and phone number of the customer that the user has selected.
  - On the same Customer Details page, the user will have the option to either return to the list, edit the customer, or delete the customer.

- **Edit Customer**:
  - If "Edit Customer" is selected, the user is taken to another component, which allows the editing of the name, email, and phone number.
  - Once any change has been made, the "Update Customer" button can be clicked, and this information will be pushed to the backend.

- **Delete Customer**:
  - If the user decides to delete the customer, a modal will populate asking the user to confirm their action to either cancel or confirm the deletion.

### 3. Sign Up to Become a Member

The third option allows the user to sign up to become a member. 

- The form allows the user to enter their name, email, and phone number.
- After doing so, the user can click the "Join" button, which will push the information to the backend and add the new customer to the Members List.

### 4. Shop Now

The fourth option on the menu is the "Shop Now" option. 

- The user can select their name from a list, which will then allow them to shop from any of the items in the Product List.
- When hovering over the Product List, the icons will enlarge and change color.
- When selected, the icons will remain highlighted, allowing the user to keep track of which items they have added to their cart.
- Once the user is done selecting items, they can select "Place Order" or simply return to the order list.
- When "Place Order" is selected, the user will be taken to an Order Details page, which will show them their order number, their order items listed with the name and price included, and a button under that will prompt to continue shopping, which will lead them back to the place order page.

### 5. Track Order

The fifth menu option is the "Track Order" option. 

- The user can take the order number provided after they place their order and enter it in a form.
- The program takes this order ID and uses it to fetch order details and tracking details, including estimated delivery date, the order date, month, and year, and a list of the items in that order.
