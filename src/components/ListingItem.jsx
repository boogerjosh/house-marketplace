import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem({ listing, id }) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${listing.type}/${id}`}
      className='categoryListingLink'>
        <div className="cardContentList">
          <div className="imgContainer">
            <div className="imgList">
              <img src={listing.imgUrls[0]}  alt={listing.name} className="categoryListingImg" />
            </div>
          </div>

          <div className='cardTextContent'>
            <p className="categoryListingName">{listing.name}</p>
            <p className="categoryListingLocation">{listing.location}</p>
            <div className='categoryListingInfoDiv'>
              <img src={bedIcon} alt='bed' />
              <p className='categoryListingInfoText'>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : '1 Bedroom'}
              </p>
              <img src={bathtubIcon} alt='bath' />
              <p className='categoryListingInfoText'>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : '1 Bathroom'}
              </p>
            </div>
            <div className='priceAndButton'>
              <div>
                {listing.regularPrice && <p className="normalPrice">$ {listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>}
                <p className="discountPrice"> $ 
                {listing.offer
                  ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {listing.type === 'rent' && ' / Month'}</p>
              </div>
              <button className='buttonPreview'>See Preview</button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ListingItem