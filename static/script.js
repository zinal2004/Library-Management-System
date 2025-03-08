(function () {
    document.addEventListener('DOMContentLoaded', () => {
        loadBooks();
        showSection('books');
    });

    let genreChart;

    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        if (sectionId === 'stats') loadStatistics();
    }

    function loadBooks() {
        fetch('/api/books')
            .then(response => response.json())
            .then(books => {
                const grid = document.getElementById('booksGrid');
                grid.innerHTML = '';
                books.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'book-card';
                    card.innerHTML = `
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Genre:</strong> ${book.genre}</p>
                        <p><strong>ISBN:</strong> ${book.isbn}</p>
                        <p><strong>Year:</strong> ${book.year}</p>
                        <p><strong>Copies:</strong> ${book.available_copies}/${book.copies}</p>
                        <p><strong>Status:</strong> ${book.available_copies > 0 ? 'Available' : 'All Borrowed'}</p>
                        <div class="dropdown">
                            <button class="dropdown-btn">Actions</button>
                            <div class="dropdown-content">
                                ${book.available_copies > 0 ? 
                                    `<button onclick="issueBook(${book.id})">Issue</button>` : 
                                    `<button onclick="returnBook(${book.id})">Return</button>`}
                                <button onclick="reserveBook(${book.id})">Reserve</button>
                                <button onclick="deleteBook(${book.id})">Delete</button>
                            </div>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            })
            .catch(error => showMessage(`Error loading books: ${error}`, 'error'));
    }

    function addBook() {
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const genre = document.getElementById('genre').value;
        const isbn = document.getElementById('isbn').value.trim();
        const year = parseInt(document.getElementById('year').value);
        const copies = parseInt(document.getElementById('copies').value);

        if (!title || !author || !genre || !isbn || isNaN(year) || isNaN(copies)) {
            showMessage("Please fill all fields correctly.", "error");
            return;
        }

        const bookData = { title, author, genre, isbn, year, copies };
        console.log("Sending book data:", bookData);

        fetch('/api/books/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
        .then(response => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Response data:", data);
            showMessage(data.message, data.status);
            if (data.status === 'success') {
                document.getElementById('title').value = '';
                document.getElementById('author').value = '';
                document.getElementById('genre').value = 'Fiction';
                document.getElementById('isbn').value = '';
                document.getElementById('year').value = '';
                document.getElementById('copies').value = '';
                loadBooks();
                showSection('books');
            }
        })
        .catch(error => {
            console.error("Error adding book:", error);
            showMessage(`Error adding book: ${error}`, 'error');
        });
    }

    function deleteBook(bookId) {
        fetch(`/api/books/delete/${bookId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.status);
            if (data.status === 'success') loadBooks();
        });
    }

    function issueBook(bookId) {
        fetch('/api/members')
            .then(response => response.json())
            .then(members => {
                const memberId = promptMemberSelection(members);
                if (memberId) {
                    fetch('/api/books/issue', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ book_id: bookId, member_id: memberId })
                    })
                    .then(response => response.json())
                    .then(data => {
                        showMessage(data.message, data.status);
                        if (data.status === 'success') loadBooks();
                    });
                }
            });
    }

    function returnBook(bookId) {
        fetch('/api/books/return', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book_id: bookId })
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.status);
            if (data.status === 'success') loadBooks();
        });
    }

    function reserveBook(bookId) {
        fetch('/api/members')
            .then(response => response.json())
            .then(members => {
                const memberId = promptMemberSelection(members);
                if (memberId) {
                    fetch('/api/books/reserve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ book_id: bookId, member_id: memberId })
                    })
                    .then(response => response.json())
                    .then(data => {
                        showMessage(data.message, data.status);
                        if (data.status === 'success') loadBooks();
                    });
                }
            });
    }

    function searchBooks() {
        const query = document.getElementById('searchInput').value;
        fetch(`/api/books/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(books => {
            const grid = document.getElementById('booksGrid');
            grid.innerHTML = '';
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';
                card.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>ISBN:</strong> ${book.isbn}</p>
                    <p><strong>Year:</strong> ${book.year}</p>
                    <p><strong>Copies:</strong> ${book.available_copies}/${book.copies}</p>
                    <p><strong>Status:</strong> ${book.available_copies > 0 ? 'Available' : 'All Borrowed'}</p>
                    <div class="dropdown">
                        <button class="dropdown-btn">Actions</button>
                        <div class="dropdown-content">
                            ${book.available_copies > 0 ? 
                                `<button onclick="issueBook(${book.id})">Issue</button>` : 
                                `<button onclick="returnBook(${book.id})">Return</button>`}
                            <button onclick="reserveBook(${book.id})">Reserve</button>
                            <button onclick="deleteBook(${book.id})">Delete</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => showMessage(`Error searching books: ${error}`, 'error'));
    }

    function loadStatistics() {
        fetch('/api/statistics')
            .then(response => response.json())
            .then(stats => {
                const textContainer = document.getElementById('statsText');
                textContainer.innerHTML = `
                    <p><strong>Total Books:</strong> ${stats.total_books}</p>
                    <p><strong>Available Books:</strong> ${stats.available_books}</p>
                    <p><strong>Borrowed Books:</strong> ${stats.borrowed_books}</p>
                    <p><strong>Overdue Books:</strong> ${stats.overdue_books}</p>
                    <p><strong>Total Borrows:</strong> ${stats.total_borrows}</p>
                    <p><strong>Most Popular Genre:</strong> ${stats.popular_genre}</p>
                `;

                if (genreChart) {
                    genreChart.destroy();
                }

                const ctx = document.getElementById('genreChart').getContext('2d');
                genreChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(stats.genre_distribution),
                        datasets: [{
                            label: 'Genre Distribution',
                            data: Object.values(stats.genre_distribution),
                            backgroundColor: [
                                '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Genre Distribution'
                            }
                        }
                    }
                });
            })
            .catch(error => showMessage(`Error loading statistics: ${error}`, 'error'));
    }

    function promptMemberSelection(members) {
        const memberList = members.map(m => `${m.id}: ${m.name}`).join('\n');
        const memberId = prompt(`Select a member by ID:\n${memberList}`);
        return memberId ? parseInt(memberId) : null;
    }

    function showMessage(message, status) {
        const msgDiv = document.getElementById('message');
        msgDiv.textContent = message;
        msgDiv.className = `message ${status}`;
        msgDiv.style.display = 'block';
        setTimeout(() => msgDiv.style.display = 'none', 3000);
    }

    // Expose functions to the global scope for onclick handlers
    window.showSection = showSection;
    window.loadBooks = loadBooks;
    window.addBook = addBook;
    window.deleteBook = deleteBook;
    window.issueBook = issueBook;
    window.returnBook = returnBook;
    window.reserveBook = reserveBook;
    window.searchBooks = searchBooks;
    window.loadStatistics = loadStatistics;
    window.promptMemberSelection = promptMemberSelection;
    window.showMessage = showMessage;
})();