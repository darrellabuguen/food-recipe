import { useEffect, useState } from "react";

export default function Category(props) {
    const category = props.category;
    const [recipes, setCategory] = useState([]);
    var [ofset, setOffset] = useState(0);

    useEffect(() => {
        getRecipe();
    }, [category]);

    const handleOffset = () => {
        setOffset(ofset += 8);
    }

    const getRecipe = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${JSON.stringify(category)}&number=8&offset=${ofset}`);
        const dataObj = await data.json();
        setCategory(dataObj.results);
    }

    return <div className="trend-con">
        <div className="gap"></div>
        <div className="gap"></div>
        <div className="trend-recipes">
            {recipes.map((item) => {
                return (
                    <figure key={item.id}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),url("${item.image}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            overflow: "hidden"
                        }}
                        className="fig"
                        onClick={() => {
                            props.que(item.id);
                        }}
                    >
                        <div
                            className="fig-trend-con"
                        >
                            <figcaption className="trend">{item.title}</figcaption>
                            <div className="gap"></div>
                            <div className="gap"></div>
                            <div className="gap"></div>
                        </div>
                    </figure>
                )
            })}
        </div>
        <span
            style={{
                float: "right"
            }}
        >
            <button
                style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent"
                }}
                onClick={() => {
                    handleOffset();
                    getRecipe();
                }}
            >
                More
            </button>
        </span>
        <div className="gap"></div>
        <div className="gap"></div>
    </div>;
}