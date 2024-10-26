import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:30017/task/BXbYKFdXZhQgEaMFbeShaisQBYG1FD4MiSf9gg4n6mVn/news-feed")
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    return (
      <div className="container">
      <h1 className="my-4">News</h1>
      <div className="row">
        {articles.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100">
              <img src={item.photo_url} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.snippet}</p>
              </div>
              <div className="card-footer">
                <a href={item.link} className="btn btn-primary">Read more</a>
                <p className="card-text"><small className="text-muted">Published Date: {item.published_datetime_utc}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

export default App;
