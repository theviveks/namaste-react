import { useEffect, useState } from "react";
import Restaurantcard from "./Restaurantcard";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterRestaurant, setFilteredRestaurant] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9628669&lng=77.57750899999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            const filterRestaurantList = listOfRestaurants.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())

                            );
                            setFilteredRestaurant(filterRestaurantList);
                        }}
                    >Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filterList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.5
                    )
                    setFilteredRestaurant(filterList);
                }}
                >Top Rated Restaurant</button>
            </div>
            <div className="res-container">
                {filterRestaurant.map((restaurant) => (
                    <Restaurantcard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default Body;