import { useEffect, useState } from "react";

function Trend(props) {
    const [trend, setTrend] = useState([]);
    useEffect(() => {
        getTrend();
    }, []);
    const getTrend = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
        const data = await api.json();
        setTrend(data.recipes);
    }

    return <div className="trend-con">
        <h2>Other recipes you might like</h2>
        <div className="gap"></div>
        <div className="trend-recipes">
            {trend.map((recipe) => {
                return (
                    <figure key={recipe.id}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),url("${recipe.image}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            overflow: "hidden"
                        }}
                        className="fig"
                        onClick={() => {
                            props.que(recipe.id);
                        }}
                    >
                        <div
                            className="fig-trend-con"
                        >
                            <figcaption className="trend">{recipe.title}</figcaption>
                            <div className="gap"></div>
                            <div className="gap"></div>
                            <div className="gap"></div>
                        </div>
                    </figure>
                )
            })}
        </div>
    </div>;
}

export default Trend;