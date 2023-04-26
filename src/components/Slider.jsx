import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import {Swiper, SwiperSlide} from "swiper/react";
// import 'swiper/swiper.min.css';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Spinner from './Spinner'
import Listing from '../pages/Listing';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      });

      setListings(listings);
      setLoading(false);
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>
        <Swiper
        // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
        >
          {listings.map((list, id) => (
            <SwiperSlide key={id} onClick={() => navigate(`/category/${list.data.type}/${list.id}`)}>
              <div className='swiperSlideDiv'>
                <img className='swiperSlideImg' src={list.data.imgUrls[0]} alt={list.data.name} />
                <p className='swiperSlideText'>{list.data.name}</p>
                <p className='swiperSlidePrice'>
                  ${list.data.discountedPrice ?? list.data.regularPrice}{' '}
                  {list.data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider