from flask import Flask, render_template, request, jsonify
from database import Library

app = Flask(__name__)
library = Library()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/books', methods=['GET'])
def get_books():
    books = library.get_books()
    return jsonify(list(books.values()))

@app.route('/api/books/add', methods=['POST'])
def add_book():
    data = request.json
    try:
        # Ensure year and copies are integers
        title = data['title']
        author = data['author']
        genre = data['genre']
        isbn = data['isbn']
        year = int(data['year'])  # Convert to int
        copies = int(data['copies'])  # Convert to int
        library.add_book(title, author, genre, isbn, year, copies)
        return jsonify({"message": "Book added successfully!", "status": "success"})
    except KeyError as e:
        return jsonify({"message": f"Missing field: {str(e)}", "status": "error"}), 400
    except ValueError as e:
        return jsonify({"message": f"Invalid data: {str(e)}", "status": "error"}), 400
    except Exception as e:
        return jsonify({"message": f"Error adding book: {str(e)}", "status": "error"}), 500

@app.route('/api/books/delete/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    try:
        library.delete_book(book_id)
        return jsonify({"message": "Book deleted successfully!", "status": "success"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 400

@app.route('/api/books/issue', methods=['POST'])
def issue_book():
    data = request.json
    try:
        library.issue_book(data['book_id'], data['member_id'])
        return jsonify({"message": "Book issued successfully!", "status": "success"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 400

@app.route('/api/books/return', methods=['POST'])
def return_book():
    data = request.json
    try:
        library.return_book(data['book_id'])
        return jsonify({"message": "Book returned successfully!", "status": "success"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 400

@app.route('/api/books/reserve', methods=['POST'])
def reserve_book():
    data = request.json
    try:
        library.reserve_book(data['book_id'], data['member_id'])
        return jsonify({"message": "Book reserved successfully!", "status": "success"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 400

@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('query', '').lower()
    books = library.search_books(query)
    return jsonify(books)

@app.route('/api/members', methods=['GET'])
def get_members():
    return jsonify(library.get_members())

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    return jsonify(library.get_statistics())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)