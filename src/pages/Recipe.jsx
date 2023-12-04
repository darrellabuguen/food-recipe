import { useEffect, useState } from "react";

export default function Recipe(props) {
    const query = props.query;
    const [information, setInformation] = useState([]);
    const [extended, setExtended] = useState([]);
    const [navs, setNavInfo] = useState(0);
    const nav_info = ["Ingredients", "Instructions"];
    const [devwidth, setWidth] = useState(0);
    useEffect(() => {
        getInformation();
    }, [query]);

    useEffect(() => {
        const expand = document.querySelector(".expand");
        const ingredients = document.querySelector(".ingredients-con");
        const arrow = document.querySelector(".arrow");

        expand.onclick = () => {
            if (ingredients.classList.contains("expanded")) {
                ingredients.classList.remove("expanded");
                ingredients.style.maxHeight = "7rem";
                arrow.style.transform = "rotate(0deg)";
            }
            else {
                ingredients.classList.add("expanded");
                arrow.style.transform = "rotate(-180deg)";
                ingredients.style.maxHeight = ingredients.scrollHeight + "px";
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });

        return () => {
            window.addEventListener('resize', () => {
                setWidth(window.innerWidth);
            });
        }
    }, [devwidth]);

    useEffect(() => {
        if (devwidth > 479) {
            document.querySelector(".ingredients-frame").style.display = "block";
            document.querySelector(".instructions-frame").style.display = "block";
            setNavInfo(0);
        }
        else if (navs === 0 && devwidth < 480) {
            document.querySelector(".instructions-frame").style.display = "none";
        }
    }, [devwidth, navs])

    const getInformation = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${JSON.stringify(query)}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`);
        const dataObj = await data.json();
        setInformation(dataObj);
        setExtended(dataObj.extendedIngredients);
    }

    const setNav = () => {
        const ingredients_frame = document.querySelector(".ingredients-frame");
        const instructions_frame = document.querySelector(".instructions-frame");
        if (navs === 0) {
            instructions_frame.style.display = "block";
            ingredients_frame.style.display = "none";
        }
        else {
            instructions_frame.style.display = "none";
            ingredients_frame.style.display = "block";
        }
    }

    return <div className="search-data-con">
        <div className="resimg-con">
            <img src={information.image} alt="img" className="search-info-image" />
        </div>
        <div className="gap"></div>
        <h1 className="res-title">{information.title}</h1>
        <div className="gap"></div>
        <div className="summary-con" dangerouslySetInnerHTML={{ __html: information.summary }}>
        </div>
        <div className="gap"></div>
        <div className="navigation-info">
            {
                nav_info.map((btn, index) => {
                    return (
                        <div
                            className={navs === index ? "active nav" : "nav"}
                            key={btn}
                            onClick={() => {
                                setNavInfo(index);
                                setNav();
                            }}
                        >
                            {btn}
                        </div>
                    )
                })
            }
        </div>
        <div className="gap"></div>
        <div className="ingredients-instructions">
            <div className="ingredients-frame">
                <h3>Ingredients</h3>
                <div className="ingredients-con">
                    {
                        extended.map((ingredients) => {
                            return (
                                <p key={ingredients.id}>{ingredients.original}</p>
                            )
                        })
                    }
                </div>
                <div className="expand">
                    <span className="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="instructions-frame">
                <h3>Instructions</h3>
                <div className="instructions-con" dangerouslySetInnerHTML={{ __html: information.instructions }}>
                </div>
                <div className="gap"></div>
            </div>
        </div>
    </div>
}