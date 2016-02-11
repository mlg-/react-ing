var Book = React.createClass({
  render: function(){
    return (
      <li className="book">
        {this.props.children}
      </li>
    );
  }
});

var BookBox = React.createClass({
  loadBooksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBookSubmit: function(book) {
    var books = this.state.data;
    book.id = Date.now();
    var newBooks = books.concat([book]);
    this.setState({data: newBooks});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: book,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: books});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadBooksFromServer();
    setInterval(this.loadBooksFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="bookBox">
        <BookForm onBookSubmit={this.handleBookSubmit} />
        <BookList data={this.state.data} />
      </div>
    );
  }
});

var BookList = React.createClass({
  render: function() {
      var bookNodes = this.props.data.map(function(book){
        var bookLink = "/books/" + book.id;
        var BookLinkTag = React.createElement('a', {href: bookLink}, book.title);
        return (
          <Book title={book.title} key={book.id}>
            <h2>{BookLinkTag}</h2>
            <h3>{book.author}</h3>
            <h4>Average Rating: {book.score}</h4>
            <p>{book.description}</p>
          </Book>
        );
      });
      return(
        <div className="bookList">
        <ul>
          {bookNodes}
        </ul>
        </div>
    );
  }
});

var BookForm = React.createClass({
  getInitialState: function() {
    return {id: '', title: '', author: '', description: ''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var description = this.state.description.trim();
    if (!title || !author || !description) {
      return;
    }
    this.props.onBookSubmit({title: title, author: author, description: description});
    this.setState({title: '', author: '', description: ''});
  },
  render: function() {
    return (
      <form className="bookForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
         /> <br/>
        <input
          type="text"
          placeholder="Author"
          value={this.state.author}
          onChange={this.handleAuthorChange}
         /> <br/>
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        /> <br/>
        <input type="submit" value="Add Your Favorite Book!" />
      </form>
    );
  }
});

ReactDOM.render(
  <BookBox url="/api/v1/books" pollInterval={2000} />,
  document.getElementById('content')
);
