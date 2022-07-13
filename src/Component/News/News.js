import React, { Component } from 'react'
import NewsItem from '../NewsItem/NewsItem'

export default class News extends Component {
    articles = []
    constructor() {
        super()
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dea736ed8ae4af18915f066278ee35b&pagesize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dea736ed8ae4af18915f066278ee35b&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            age: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dea736ed8ae4af18915f066278ee35b&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;

        if (this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize )) {
        }
        else {
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center text-light'>News Monkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4  my-2" key={element.url}>
                            <NewsItem title={element.title} description={element.description} urltoimage={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-light" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-light" id="next-button" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
