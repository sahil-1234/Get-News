import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroller';

function TopStories({ apiKey, section }) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [articleEnd, setArticleEnd] = useState(6);
    const [sectionTitle, setSectionTitle] = useState("Home");
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `${section === "home" ? '' : sectionTitle} Headlines - Get News`;

        const fetchData = async () => {
            try {
                let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                let data = await response.json();
                setArticles(data.results);
                setSectionTitle(data.section);
                setHasMore(data.results.length > articleEnd);
                document.title = `Get News - ${section === "home" ? '' : sectionTitle} Headlines`;
            } catch (err) {
                setError(err.message);
                setHasMore(false);
            }
        };
        
        fetchData();
    }, [apiKey, section]);

    const handleNextClick = () => {
        if (page < Math.ceil(articles.length / 6)) {
            setPage(page + 1);
            setArticleEnd(articleEnd + 6);
        }
    };

    const renderNews = (start, end) => {
        return articles.slice(start, end).map((e) => {
            if (!e.title || !e.abstract || e.section === "admin") {
                return null;
            }

            let imgUrl = e.multimedia?.[1]?.url;
            let formattedDate = new Date(e.published_date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/New_York'
            });

            return (
                <div className='col-md-4' style={{ padding: '10px' }} key={e.uri}>
                    <NewsCard
                        title={e.title}
                        abstract={e.abstract}
                        newsUrl={e.url}
                        imgUrl={imgUrl}
                        author={e.byline}
                        date={formattedDate}
                    />
                </div>
            );
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {articles.length === 0 ? <Spinner /> :
                <div className="container my-3" style={{ padding: "4rem" }}>
                    <h2 id="heading" className="text-center">{section === "home" ? '' : sectionTitle} Headlines</h2>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleNextClick}
                        hasMore={hasMore}
                        loader={<Spinner key={0} />}
                        threshold={-10}
                    >
                        <div className="row my-3">
                            {renderNews(0, articleEnd)}
                        </div>
                    </InfiniteScroll>
                </div>}
        </>
    );
}

export default TopStories;
