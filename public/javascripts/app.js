var Book = React.createClass({
  render: function(){
    return (
      <div className="book">
        <h2 className="bookTitle">
          {this.props.title}
        </h2>
        {this.props.children}
      </div>
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
        <BookForm />
        <BookList data={this.state.data} />
      </div>

    );
  }
});

var BookList = React.createClass({
  render: function() {
      var bookNodes = this.props.data.map(function(book){
        return (
          <Book title={book.title} key={book.id}>
            {book.author} {book.description}
          </Book>
        );
      });
      return(
        <div className="bookList">
          {bookNodes}
        </div>
    );
  }
});

var BookForm = React.createClass({
  render: function() {
    return (
      <div className="bookForm">
        Hello, world! I am a Book form.
      </div>
    )
  }
});


ReactDOM.render(
  <BookBox url="/api/v1/books" pollInterval={2000} />,
  document.getElementById('content')
);
