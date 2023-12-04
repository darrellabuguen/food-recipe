import { useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";

export default function Categories(props) {
    const categories = props.categories;
    const [selected, setSelected] = useState(-1);

    return <div className="category-con">
        <Splide
            options={{
                perPage: 4,
                pagination: false,
                drag: "free",
                arrows: false,
                gap: "0.5rem"
            }}>
            {
                categories.map((item, index) => {
                    return (
                        <SplideSlide
                            key={item.id}
                        >
                            <div
                                className={selected === index ? "div-tag active" : "div-tag"}
                                key={item}
                                onClick={() => {
                                    setSelected(index);
                                    props.category(item);
                                    props.clicked();
                                }}
                            >
                                {item}
                            </div>
                        </SplideSlide>
                    )
                })
            }
        </Splide>
    </div>
}