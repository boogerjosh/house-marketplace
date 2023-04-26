import {Link} from 'react-router-dom'
// import 
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

import React from 'react'

function Explore() {
  return (
    <div className='explore'>
      <Slider/>

      <header>
        <div className='headerExplore'>
          <div className='headerTextOne'>
            <p>Where do you <br/> want to rent?</p>
          </div>
          <div className='headerTextTwo'>
            <p>
              Explore points of interest in <br/> various places around the world
            </p>
            <button className='buttonViwaAll'>View all places</button>
          </div>
        </div>
      </header>

      <main>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
            src={rentCategoryImage}
            alt='rent'
            className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for rent</p>
          </Link>
          <Link to='/category/sale'>
          <img
            src={sellCategoryImage}
            alt='sell'
            className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore