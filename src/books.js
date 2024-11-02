import React from "react";

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allBooks: [],
            singleBook: {
                name: '',
                id: 0
            }
        };
        this.getAllBooks = this.getAllBooks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleUpdateBook = this.handleUpdateBook.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    getAllBooks() {
        fetch('http://localhost:8080/api/books')
            .then(res => res.json())
            .then(result => {
                this.setState({ allBooks: result });
            })
            .catch(console.log);
    }

    handleChange(e) {
        this.setState({
            singleBook: {
                ...this.state.singleBook,
                name: e.target.value
            }
        });
    }

    handleAddBook() {
        fetch('http://localhost:8080/api/books/addBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.singleBook.name })
        })
        .then(res => res.json())
        .then(() => {
            this.getAllBooks();  // Refresh the book list
            this.setState({ singleBook: { name: '', id: 0 } }); // Clear input field
        })
        .catch(console.log);
    }

    handleUpdateBook(id) {
        fetch(`http://localhost:8080/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.singleBook.name })
        })
        .then(() => {
            this.getAllBooks(); // Refresh the book list
            this.setState({ singleBook: { name: '', id: 0 } }); // Clear input field
        })
        .catch(console.log);
    }

    handleDeleteBook(id) {
        fetch(`http://localhost:8080/api/books/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.getAllBooks(); // Refresh the book list
        })
        .catch(console.log);
    }

    render() {
        return (
            <div className="container">
                <span className="title-bar">
                    <button className="btn btn-primary" type="button" onClick={this.getAllBooks}>Get Books</button>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal">
                        Add Book
                    </button>
                </span>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allBooks.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-info" 
                                        data-toggle="modal" 
                                        data-target="#exampleModal"
                                        onClick={() => this.setState({ singleBook: { name: book.title, id: book.id } })}
                                    >
                                        Update Book
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        onClick={() => this.handleDeleteBook(book.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add / Update Book</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="title">Enter Book Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={this.state.singleBook.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => 
                                        this.state.singleBook.id 
                                            ? this.handleUpdateBook(this.state.singleBook.id) 
                                            : this.handleAddBook()
                                    }
                                    data-dismiss="modal"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Books;
