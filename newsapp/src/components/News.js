import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

   Capitalize =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title=`${this.Capitalize(this.props.category)} - Latest News`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1eb5aeba80ad449891dcfb6a834197ed&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&//apiKey=1eb5aeba80ad449891dcfb6a834197ed&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    //let data = await fetch(url);
    //let parsedData = await data.json();
    //console.log(parsedData);
    //this.setState({
    //  articles: parsedData.articles,
    //  totalResults: parsedData.totalResults,
    //  loading: false,
    //});
    this.updateNews();
  }

  handlePrevClick = async () => {
    //let url = `https://newsapi.org/v2/top-headlines?country=${
    //  this.props.country
    //}&category=${
    //  this.props.category
    //}&apiKey=1eb5aeba80ad449891dcfb6a834197ed&page=${
    //  this.state.page - 1
    //}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    //let data = await fetch(url);
    //let parsedData = await data.json();
    //console.log(parsedData);
    //this.setState({
    //  page: this.state.page - 1,
    //  articles: parsedData.articles,
    //  loading: false,
    //});
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    //if (
    //  !(
    //    this.state.page + 1 >
    //    Math.ceil(this.state.totalResults / this.props.pageSize)
    //  )
    //) {
    //  let url = `https://newsapi.org/v2/top-headlines?country=${
    //    this.props.country
    //  }&category=${
    //    this.props.category
    //  }&apiKey=1eb5aeba80ad449891dcfb6a834197ed&page=${
    //    this.state.page + 1
    //  }&pageSize=${this.props.pageSize}`;
    //  this.setState({ loading: true });
    //  let data = await fetch(url);
    //  let parsedData = await data.json();
    //  this.setState({
    //    page: this.state.page + 1,
    //    articles: parsedData.articles,
    //    loading: false,
    //  });
    //}
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          Latest News on {this.Capitalize(this.props.category)} - Top Hadlines 
        </h1>
        {!this.state.loading && this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
