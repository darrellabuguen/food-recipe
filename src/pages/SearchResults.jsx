import { useEffect, useState } from "react"

function Search(props) {
    const [searchResults, setResults] = useState([]);
    const [totalRes, setTotalRes] = useState(0);
    const query = props.query;
    var ofset = props.offset;

    const searchRecipe = () => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&number=8&offset=${ofset}`)
            .then(response => {
                if (!response.ok) {
                    console.error("Response error");
                }
                return response.json();
            })
            .then(result => {
                setResults(result.results);
                setTotalRes(result.totalResults);
                props.resultNum(result.totalResults);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        searchRecipe();
    }, [query, ofset]);

    return <div className="search-con-res">
        <div className="gap"></div>
        <div className="gap"></div>

        {
            totalRes !== 0 && (
                <div
                    style={{
                        width: "100%"
                    }}
                >
                    <h1>
                        Search results for {query}
                    </h1>
                </div>
            )
        }
        {
            totalRes === 0 && (
                <h1>No results found for {query}</h1>
            )
        }
        <div className="gap"></div>
        <div className="search-res">
            {
                searchResults.map((item) => {
                    return (
                        <figure key={item.id}
                            className="fig-search"
                            onClick={() => {
                                props.que(item.id);
                            }}
                        >
                            <img src={item.image} alt="img" className="fig-search-img" />
                            <figcaption
                                style={{
                                    fontWeight: 'large'
                                }}
                            >{item.title}</figcaption>
                            <div className="gap"></div>
                            <div className="gap"></div>
                            <div className="gap"></div>
                        </figure>
                    )
                })
            }
        </div>
        <div className="gap"></div>
        <div className="gap"></div>
    </div>
}

export default Search;