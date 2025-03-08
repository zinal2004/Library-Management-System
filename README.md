Welcome to the Library Management System, a web-based application designed to automate and streamline library operations. This system, built with Flask and an intuitive frontend, allows librarians to efficiently manage books, members, and borrowing activities. Additionally, it features a real-time statistics dashboard with a pie chart visualization to track book distribution by genre.

🚀 Overview
This project provides an efficient way to handle essential library tasks such as adding, deleting, issuing, returning, and reserving books, while tracking key metrics like total books, available books, borrowed books, overdue books, and genre popularity. Leveraging optimized data structures and algorithms, it ensures high performance and scalability, making it a great learning resource for web development and DSA concepts.

🔹 Features
✅ Book Management – Add, delete, issue, return, and reserve books with attributes like title, author, genre, ISBN, year, and copies.
✅ Member Management – Track members and their borrowing history.
✅ Search & Filtering – Find books easily by title, author, or ISBN.
✅ Statistics Dashboard – View real-time metrics (total books, available books, borrowed books, overdue books, most borrowed genre) with an interactive pie chart.
✅ User-Friendly UI – Clean, responsive design with an intuitive sidebar, card-based book display, and interactive forms.
✅ Optimized Data Handling – Uses efficient data structures to ensure fast and scalable operations.

🛠️ Tech Stack
Backend: Flask (Python 3.x)
Frontend: HTML5, CSS3, JavaScript (Chart.js for visualizations)
Dependencies: Managed via requirements.txt

🧩 Data Structures & Algorithms (DSA)
🔹 Hash Map (dict): Quick lookup for books and members with O(1) operations.
🔹 List (list): Stores borrowing history efficiently with O(1) append.
🔹 Deque (collections.deque): Manages book reservations with O(1) enqueue/dequeue for a FIFO queue.
🔹 Min-Heap (heapq): Tracks overdue books with O(log n) insert and O(1) min access.
🔹 Defaultdict (collections.defaultdict): Efficiently updates genre popularity in O(1) time.

📥 Installation
🔹 Prerequisites
✅ Python 3.x
✅ Git (for cloning the repository)
✅ A web browser (Chrome, Firefox, etc.)

🔹 Steps
1️⃣ Clone the Repository:

git clone https://github.com/zinal2004/Library-Management-System.git
cd Library-Management-System
2️⃣ Install Dependencies:

pip install -r requirements.txt
3️⃣ Run the Application:

python app.py
4️⃣ Access the Application:
Open your browser and navigate to:
📌 http://127.0.0.1:5000

🎯 Usage Guide
🔹 Navigation: Use the sidebar to switch between Books, Add Book, and Statistics sections.
🔹 Books Section: View a grid of books with details (title, author, genre, etc.), and perform actions like issue, return, reserve, or delete via dropdown menus.
🔹 Add Book: Fill out a form with book details (title, author, genre, ISBN, year, copies) and click "Add Book" to submit.
🔹 Statistics: View real-time library metrics with a pie chart showing genre distribution.
🔹 Search: Use the search bar to filter books by title, author, or ISBN.

🔧 Development
🔹 Running Locally
✔️ Ensure all dependencies are installed (see Installation steps).
✔️ Modify app.py or database.py to add new features or fix bugs.
✔️ Enable Flask debug mode (debug=True in app.py) for live reloading.
