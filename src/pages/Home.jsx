import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";

function Home(props) {
    const [hrecipes, setHome] = useState([]);
    const [pagee, setPageNum] = useState(3);
    useEffect(() => {
        getRand();
    }, []);
    const getRand = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        const dataObj = await data.json();
        setHome(dataObj.recipes);
    }
    const setPage = () => {
        let inwidth = window.innerWidth;
        let otwidth = window.outerWidth;
        if (inwidth <= 425 || otwidth <= 425) {
            setPageNum(1);
        }
        else if (inwidth <= 768 || otwidth <= 768) {
            setPageNum(2);
        }
        else {
            setPageNum(3);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', setPage);

        return () => {
            window.addEventListener('resize', setPage);
        }
    }, []);
    return <div className="home-con">
        <h2>Our vegetarian picks</h2>
        <div className="gap"></div>
        <Splide
            options={{
                perPage: pagee,
                pagination: false,
                drag: "free",
                gap: "1rem"
            }}>
            {
                hrecipes.map((hrecp) => {
                    return (
                        <SplideSlide
                            key={hrecp.id}
                        >
                            <figure
                                key={hrecp.id}
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),url("${hrecp.image}")`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover"
                                }}
                                onClick={() => {
                                    props.que(hrecp.id);
                                }}
                                className="home-fig"
                            >
                                <figcaption className="homee">{hrecp.title}</figcaption>
                                <div className="gap"></div>
                                <div className="gap"></div>
                                <div className="gap"></div>
                            </figure>
                        </SplideSlide>
                    )
                })
            }
        </Splide>
    </div>

}

export default Home;