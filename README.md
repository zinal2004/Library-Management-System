# 📚 Library Management System 🚀

## 🌟 Overview

Welcome to the Library Management System, your ultimate tool for efficiently managing library operations, tracking book activities, and gaining insights into library usage. Whether you're a librarian or an educational institution, this system keeps your book collection organized and optimized. 📚📊

## ✨ Features

✅ **Book Management** – Add, delete, issue, return, and reserve books with attributes like title, author, genre, ISBN, year, and copies.

✅ **Real-Time Book Tracking** – Monitor available, borrowed, and overdue books.

✅ **Borrowing History** – Maintain a detailed log of all borrowing transactions.

✅ **Low Availability Alerts** – Get notified about books with low copies.

✅ **Data Visualization** – View statistics (total books, popular genres) with an interactive pie chart.

## 🛠️ Technologies Used

🔹 **Python** – Core programming language for backend logic.

🔹 **Flask** – Lightweight web framework for API and server management.

🔹 **HTML5/CSS3/JavaScript** – For a responsive and interactive frontend (Chart.js for visualizations).

🔹 **Collections Module** – Powers advanced data structures (Deque, Defaultdict).

🔹 **Heapq** – For efficient overdue book tracking.

🔹 **Datetime** – For precise transaction timestamps.

## 🛠️ Data Structures Used

📚 **Hash Map (Dictionary)** – Used to store book information with quick lookup capabilities by ISBN or title.

📝 **Linked List** – Maintains the borrowing history of books, ensuring efficient insertion and deletion of records.

🛃 **Queue** – Manages book reservation requests, ensuring a first-come, first-served order for popular books.

🔄 **Heap (Priority Queue)** – Used for tracking overdue books based on return deadlines, enabling efficient retrieval of the most overdue books.


## ⚖️ Installation

### 📌 Prerequisites

Ensure you have Python 3.x and Git installed. Download Python from [python.org](https://www.python.org/).

### 🚀 Setup Steps

1⃣ Clone the Repository:

```sh
git clone https://github.com/your-username/library-management-system.git
cd Library-Management-System
```

2⃣ Install Dependencies:

```sh
pip install -r requirements.txt
```

3⃣ Run the Application:

```sh
python app.py
```

4⃣ Access the Application:

Open your browser and navigate to: 📌 **http://127.0.0.1:5000**

## 📚 How to Use

🌂 **Adding a Book**

- Via UI: Fill the form with title, author, genre, ISBN, year, and copies, then click "Add Book".

❌ **Removing a Book**

- Select a book in the "Books" section and choose "Delete" from the dropdown.

🔄 **Issuing a Book**

- Select a book with available copies and choose "Issue" to prompt for a member ID.

📉 **Checking Overdue Books**

- View overdue books in the "Statistics" section.

💾 **Viewing Statistics**

- Navigate to "Statistics" to see metrics and the genre distribution pie chart.

## 📂 Project Structure

```
Library-Management-System/
│-- app.py              # Flask backend with API endpoints
│-- database.py         # Core logic with data structures and methods
│-- static/
│   ├── styles.css      # CSS for UI styling
│   ├── script.js       # JavaScript for frontend interactivity
│-- templates/
│   ├── index.html      # Main HTML template
│-- requirements.txt    # Python dependencies
│-- README.md           # Project documentation
```

## 👥 Contributors

💡 **Zinal Shah** – Lead Developer & Architect

## 💌 Contact

📧 Feel free to reach out via **zinal200420@gamil.com** or check out my work on [GitHub](https://github.com/zinal2004).

---
