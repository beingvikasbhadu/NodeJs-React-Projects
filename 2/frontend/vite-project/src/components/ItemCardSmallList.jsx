import axios from 'axios'
import ItemCardSmall from './ItemCardSmall'
import { useEffect, useState } from 'react'
const ItemCardSmallList=(props)=>{
    console.log("ItemCardSmallList re-rendering")

    const [itemsWithRating, setItemsWithRating] = useState([]);

  useEffect(() => {
    const fetchItemsWithRating = async () => {
      const itemsWithRatingArray = await Promise.all(props.items.map(async (item) => {
        const url = "http://localhost:3000/reviews-and-ratings";
        const headers = { _id: item._id };
        try {
          const res = await axios.get(url, { headers });
          var rating = Math.floor(res.data.reviewsAndRatings.reduce((acc, curr) => acc + curr.rating, 0) / res.data.reviewsAndRatings.length);
          if(isNaN(rating)) rating=0;
          return { ...item, rating }; // Merge the item object with the calculated rating
        } catch (error) {
          console.error("Error fetching rating:", error);
          return item; // Return the item without rating in case of an error
        }
      }));
      setItemsWithRating(itemsWithRatingArray);
    };

    fetchItemsWithRating();
  }, [props.items]);

  return (
    <div className='flex justify-content p-2'>
      {itemsWithRating.map(item => (
        <ItemCardSmall
          key={item._id}
          title={item.heading}
          pic={item.pic}
          price={item.price}
          rating={item.rating}
        />
      ))}
    </div>
  );

}

export default ItemCardSmallList