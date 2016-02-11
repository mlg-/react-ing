var Review = React.createClass({
  render: function(){
    return (
      <div className="review">
        <p className="reviewScore">
          Rating: {this.props.score} <br/>
          Comments: {this.props.children}
        </p>
      </div>
    );
  }
});

var ReviewBox = React.createClass({
  loadReviewsFromServer: function() {
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
  handleReviewSubmit: function(review) {
    var reviews = this.state.data;
    review.id = Date.now();
    var newReviews = reviews.concat([review]);
    this.setState({data: newReviews});
    $.ajax({
      url: bookUrl + "/reviews/new",
      dataType: 'json',
      type: 'POST',
      data: review,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: reviews});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadReviewsFromServer();
    setInterval(this.loadReviewsFromServer, this.props.pollInterval);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function(){
    return (
      <div className="reviewBox">
        <h1>Reviews</h1>
        <ReviewList data={this.state.data}/>
        <ReviewForm onReviewSubmit={this.handleReviewSubmit} />
      </div>
    );
  }
});

var ReviewList = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <Review score={review.score} key={review.id}>
          {review.description}
        </Review>
      );
    });
      return (
        <div className="reviewList">
          {reviewNodes}
        </div>
      );
  }
});

var ReviewForm = React.createClass({
  getInitialState: function() {
    return {score: '', description: ''};
  },
  handleScoreChange: function(e){
    this.setState({score: e.target.value});
  },
  handleDescriptionChange: function(e){
    this.setState({description: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var score = this.state.score.trim();
    var description = this.state.description.trim();
    if (!score || !description) {
      return;
    }
    this.props.onReviewSubmit({score: score, description: description});
    this.setState({score: '', description: ''})
  },
  render: function(){
    return (
      <form className="reviewForm" onSubmit={this.handleSubmit} >
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="score-input"
          value={this.state.score}
          onChange={this.handleScoreChange}
        /> <br/>
        <input
          type="text"
          placeholder="Tell us why..."
          id="description-input"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        /> <br/>
        <input type="submit" value="Add Review" />
      </form>
    );
  }
});

var bookTitleNode = document.getElementsByClassName('book-title');
var bookId = $(bookTitleNode[0]).attr('id').match(/book-([0-9]+)/)[1];
var bookUrl = "/api/v1/books/" + bookId;

ReactDOM.render(
  <ReviewBox url={bookUrl} pollInterval={50000} />,
  document.getElementById('book-reviews')
);
