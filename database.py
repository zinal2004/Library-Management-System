from datetime import datetime, timedelta
from collections import deque, defaultdict
import heapq

class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.borrowing_history = []
        self.reservations = deque()
        self.overdue_heap = []
        self.genre_popularity = defaultdict(int)
        self.book_id_counter = 1
        self.member_id_counter = 1
        self._initialize_data()

    def _initialize_data(self):
        initial_books = [
            {"title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "isbn": "978-0446310789", "year": 1960, "copies": 3},
            {"title": "1984", "author": "George Orwell", "genre": "Dystopia", "isbn": "978-0451524935", "year": 1949, "copies": 2},
            {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "isbn": "978-0743273565", "year": 1925, "copies": 4},
            {"title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Romance", "isbn": "978-0141439518", "year": 1813, "copies": 2},
            {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "isbn": "978-0316769488", "year": 1951, "copies": 3}
        ]
        for book in initial_books:
            self.add_book(book['title'], book['author'], book['genre'], book['isbn'], book['year'], book['copies'])

        self.members = {
            1: {"id": 1, "name": "Alice Johnson", "joined_date": "2023-01-15", "borrowed_books": 0},
            2: {"id": 2, "name": "Bob Smith", "joined_date": "2023-03-22", "borrowed_books": 0},
            3: {"id": 3, "name": "Clara Davis", "joined_date": "2023-06-10", "borrowed_books": 0}
        }
        self.member_id_counter = 4

    def add_book(self, title, author, genre, isbn, year, copies):
        if not all([title, author, genre, isbn, year, copies]):
            raise ValueError("All book fields are required")
        book_id = self.book_id_counter
        self.book_id_counter += 1
        self.books[book_id] = {
            "id": book_id,
            "title": title,
            "author": author,
            "genre": genre,
            "isbn": isbn,
            "year": year,
            "copies": copies,
            "available_copies": copies,
            "borrowed_by": [],
            "added_date": datetime.now().strftime("%Y-%m-%d"),
            "reservations": []
        }
        self.genre_popularity[genre] += copies

    def delete_book(self, book_id):
        if book_id not in self.books:
            raise ValueError("Book not found")
        genre = self.books[book_id]['genre']
        self.genre_popularity[genre] -= self.books[book_id]['copies']
        del self.books[book_id]

    def get_books(self):
        return self.books

    def get_members(self):
        return list(self.members.values())

    def issue_book(self, book_id, member_id):
        if book_id not in self.books:
            raise ValueError("Book not found")
        if member_id not in self.members:
            raise ValueError("Member not found")
        if self.books[book_id]['available_copies'] <= 0:
            raise ValueError("No available copies")
        self.books[book_id]['available_copies'] -= 1
        self.books[book_id]['borrowed_by'].append(member_id)
        self.members[member_id]['borrowed_books'] += 1
        due_date = (datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")
        self.borrowing_history.append({
            "book_id": book_id,
            "member_id": member_id,
            "status": "issued",
            "issue_date": datetime.now().strftime("%Y-%m-%d"),
            "due_date": due_date
        })
        heapq.heappush(self.overdue_heap, (due_date, book_id, member_id))

    def return_book(self, book_id):
        if book_id not in self.books:
            raise ValueError("Book not found")
        if self.books[book_id]['available_copies'] >= self.books[book_id]['copies']:
            raise ValueError("All copies are already returned")
        member_id = self.books[book_id]['borrowed_by'].pop(0)
        self.books[book_id]['available_copies'] += 1
        self.members[member_id]['borrowed_books'] -= 1
        for record in self.borrowing_history:
            if record['book_id'] == book_id and record['status'] == "issued" and record['member_id'] == member_id:
                record['status'] = "returned"
                record['return_date'] = datetime.now().strftime("%Y-%m-%d")
                break
        if self.books[book_id]['reservations']:
            next_member = self.books[book_id]['reservations'].pop(0)
            self.reservations.append({"book_id": book_id, "member_id": next_member})

    def reserve_book(self, book_id, member_id):
        if book_id not in self.books:
            raise ValueError("Book not found")
        if member_id not in self.members:
            raise ValueError("Member not found")
        if self.books[book_id]['available_copies'] > 0:
            raise ValueError("Book is available, no need to reserve")
        if member_id not in self.books[book_id]['reservations']:
            self.books[book_id]['reservations'].append(member_id)

    def search_books(self, query):
        results = [
            book for book in self.books.values()
            if query in book['title'].lower() or query in book['author'].lower() or query in book['isbn'].lower()
        ]
        return results

    def get_statistics(self):
        overdue_books = len([item for item in self.overdue_heap if datetime.strptime(item[0], "%Y-%m-%d") < datetime.now()])
        total_borrows = len([record for record in self.borrowing_history if record['status'] == "issued"])
        total_books = sum(book['copies'] for book in self.books.values())
        available_books = sum(book['available_copies'] for book in self.books.values())
        borrowed_books = total_books - available_books
        popular_genre = max(self.genre_popularity.items(), key=lambda x: x[1])[0] if self.genre_popularity else "N/A"
        return {
            "total_books": total_books,
            "available_books": available_books,
            "borrowed_books": borrowed_books,
            "overdue_books": overdue_books,
            "total_borrows": total_borrows,
            "popular_genre": popular_genre,
            "genre_distribution": dict(self.genre_popularity)
        }