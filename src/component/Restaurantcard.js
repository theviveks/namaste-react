import { CDN_URL } from "../utils/constants";

const Restaurantcard = (props) => {

    const { resData } = props
    const { name, cuisines, avgRating, costForTwo, cloudinaryImageId } = resData?.info
    const { slaString } = resData.info?.sla
    return (
        <div className="res-card">
            <div className="logo">
                <img alt="res-log" className="res-logo" src={CDN_URL + cloudinaryImageId}></img>
            </div>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{slaString}</h4>
        </div>
    )
}
export default Restaurantcard;