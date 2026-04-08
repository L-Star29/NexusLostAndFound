import { useEffect, useState } from "react";
import SmallHero from "./Sections/SmallHero.tsx";
import './Postings.css';
import Banner from "./Components/Banner.tsx";
import Footer from "./Components/Footer.tsx";
import ItemCard from "./Components/ItemCard.tsx";
import supabase from "./supabase";


function Postings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        console.log('Fetched data:', data);
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Banner />
      <SmallHero />
      <div className='item-listing'>
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <Footer />
    </div>
  );
}

export default Postings;
