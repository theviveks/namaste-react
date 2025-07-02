import React from 'react'
import { useState, useEffect } from 'react';
import Shimmer from "./Shimmer"
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/constants';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const { resId } = useParams();
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId);
        const json = await data.json();
        console.log("Full Menu Data:", json?.data); // 🔍 Log to inspect structure
        setResInfo(json?.data);
    };

    if (resInfo === null) {
        return <Shimmer />;
    }

    // Safely find the restaurant info card
    const cards = resInfo?.cards || [];
    let restaurantInfo = null;
    let menuItems = [];

    for (const card of cards) {
        const info = card?.card?.card?.info;
        if (info) {
            restaurantInfo = info;
        }

        const groupedCard = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        if (groupedCard) {
            for (const group of groupedCard) {
                if (group?.card?.card?.itemCards) {
                    menuItems = group.card.card.itemCards;
                    break;
                }
            }
        }

        if (restaurantInfo && menuItems.length) break;
    }

    if (!restaurantInfo || !menuItems.length) {
        return <h2>Menu not available.</h2>;
    }

    const { name, cuisines, costForTwoMessage } = restaurantInfo;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines?.join(", ")}</h3>
            <h3>{costForTwoMessage}</h3>
            <h1>Menus</h1>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name} - ₹
                        {(item.card.info.price ?? item.card.info.defaultPrice) / 100}
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default RestaurantMenu;