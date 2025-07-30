# 🗃️ Inventoria

**Inventoria** is a simple CRUD (Create, Read, Update, Delete) product management app built with **HTML**, **CSS**, and **JavaScript**. It stores product data locally using **localStorage** and supports dynamic search by title or category.

---

## 📌 Features

- Add multiple products at once
- Display all saved products in a table
- Update or delete any product
- Delete all products with one click
- Real-time search by title or category
- Data persistence using localStorage

---

## 📐 Project Structure (Map)

To organize the work clearly, the project is divided into 3 main parts:

### 1️⃣ Head
- Contains the title of the app (e.g. “Inventoria”)
- A search box for filtering products
- Buttons for switching search mode (`Title` / `Category`)

### 2️⃣ Input Part
- Fields for entering:
  - Product Title
  - Price, Taxes, Ads, Discount
  - Count (how many items to create)
  - Category
- A **Create / Update** button
- Auto-calculated **Total** price
- Input validation and live updates

### 3️⃣ Output Part
- A dynamic table showing all products
- Buttons for:
  - `Update` any row (load it into the input fields)
  - `Delete` individual products
  - `Delete All` products
- Product list updates automatically after changes

---

## 🚀 Technologies Used

- **HTML**: for structure
- **CSS**: for layout and styling
- **JavaScript**:
  - `localStorage` for saving data
  - DOM manipulation for CRUD actions
  - Event listeners and conditional logic for interactivity
  - BOM to make things easy!
---

## 🧠 How It Works

1. User enters product details in the input fields
2. Clicking `Create` will:
   - Add the product(s) to the list
   - Save them in `localStorage`
3. All saved products are listed in the table below
4. Users can:
   - Click `Update` to modify a product
   - Click `Delete` to remove a product
   - Use search to filter by title or category