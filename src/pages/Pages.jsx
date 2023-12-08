import { useState } from "react";
import Home from "./Home";
import SearchResults from "./SearchResults";
import Trend from "./Trend";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Category from "./Category";
import Recipe from "./Recipe";
import Search from "../components/Search";

function Pages() {
    const categories = ["Appetizer", "Dessert", "Main Course", "Pasta", "Salad", "Soup"];
    const [datafromchild, setChild] = useState('');
    const [query, setQuery] = useState('');
    const [searchInpt, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    var [ofset, setOfset] = useState(0);
    const getCategory = (childData) => {
        setChild(childData);
    }
    const queryHandle = (childQuery) => {
        setQuery(childQuery);
    }

    const hidePages = () => {
        setQuery('');
    }

    const resHandle = (total) => {
        setTotal(total)
    }

    const searchInptHandle = (searchQuery) => {
        setSearch(searchQuery);
    }

    const offsetHandle = () => {
        if (ofset + 8 >= total) {
            setOfset(0);
        }
        else {
            setOfset(ofset += 8);
        }
        setChild('');
    }

    return <div>
        <Header />
        <Search searchQue={searchInptHandle} addOffset={offsetHandle} clicked={hidePages} />
        {/* <SearchResults que={queryHandle} hide={hideOther} searchQue={searchInptHandle} /> */}
        <Categories categories={categories} category={getCategory} clicked={hidePages} />
        {
            !query && !datafromchild && !searchInpt && (
                <div>
                    <div className="gap"></div>
                    <Home que={queryHandle} />
                    <div className="gap"></div>
                    <Trend que={queryHandle} />
                    <div className="gap"></div>
                    <div className="gap"></div>
                </div>
            )
        }
        {
            datafromchild && !query && (
                <Category category={datafromchild} que={queryHandle} />
            )
        }
        {
            query && (
                <Recipe query={query} />
            )
        }
        {
            searchInpt && !query && !datafromchild && (
                <SearchResults query={searchInpt} que={queryHandle} offset={ofset} resultNum={resHandle} />
            )
        }
    </div>

}
export default Pages;