import { useState } from "react"
import btn_image from "../images/search_icon.png"

export default function Search(props) {

    const [searchInpt, setSearch] = useState('');

    const inptHandle = (e) => {
        setSearch(e.target.value);
    }

    return <div className="search-con">
        <div className="search-frame">
            <input
                type="search"
                placeholder="search"
                className="inpt-search"
                onChange={inptHandle}
            />
            <button
                className="btn-search"
                onClick={() => {
                    props.searchQue(searchInpt);
                    props.addOffset();
                    props.clicked();
                }}
            >
                <img src={btn_image} alt="img" className="btn-img" />
            </button>
        </div>
        <div className="gap"></div>
    </div>
}