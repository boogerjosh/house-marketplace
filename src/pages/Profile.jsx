import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      console.log(listings);

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

//   const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  return (
    <div className='profile'>
      <div className="profilePageContainer">
        <header className='profileHeader'>
            <p className='pageHeader'>My Profile</p>
            <button type='button' className='logOut' onClick={onLogout}>
            Logout
            </button>
        </header>

        <main>
            <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Update your personal details here.</p>
            <p
                className='changePersonalDetails'
                onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
                }}
            >
                {changeDetails ? 'done' : 'change'}
            </p>
            </div>

            <div className='profileCard'>
            <form>
                <label className='labelProfileName'>Name</label>
                <input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
                />
                <label>Email</label>
                <input
                type='email'
                id='email'
                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
                />
            </form>
            </div>

            <Link to='/create-listing' className='createListing'> 
            <img src={homeIcon} alt='home' />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt='arrow right' />
            </Link>

            {!loading && listings?.length > 0 && (
            <>
                <p className='listingText'>Your Listings</p>
                <ul className='listingsList'>
                {listings.map((listing) => (
                    <li className='categoryListingProfile'>
                     <Link
                       to={`/category/${listing.data.type}/${listing.id}`}
                       className='categoryListingLinkProfile'
                     >
                       <img
                         src={listing.data.imgUrls[0]}
                         alt={listing.data.name}
                         className='categoryListingImgProfile'
                       />
                       <div className='categoryListingDetails'>
                         <p className='categoryListingLocationProfile'>{listing.data.location}</p>
                         <p className='categoryListingNameProfile'>{listing.data.name}</p>
               
                         <p className='categoryListingPrice'>
                           $
                           {listing.data.offer
                             ? listing.data.discountedPrice
                                 .toString()
                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                             : listing.data.regularPrice
                                 .toString()
                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                           {listing.data.type === 'rent' && ' / Month'}
                         </p>
                         <div className='categoryListingInfoDiv'>
                           <img src={bedIcon} alt='bed' />
                           <p className='categoryListingInfoText'>
                             {listing.data.bedrooms > 1
                               ? `${listing.data.bedrooms} Bedrooms`
                               : '1 Bedroom'}
                           </p>
                           <img src={bathtubIcon} alt='bath' />
                           <p className='categoryListingInfoText'>
                             {listing.data.bathrooms > 1
                               ? `${listing.data.bathrooms} Bathrooms`
                               : '1 Bathroom'}
                           </p>
                         </div>
                       </div>
                     </Link>
                    
                     <DeleteIcon
                        className='removeIcon'
                        fill='rgb(231, 76,60)'
                        onClick={() => onDelete(listing.id, listing.name)}
                     />
                     {/* {onDelete && (
                       <DeleteIcon
                         className='removeIcon'
                         fill='rgb(231, 76,60)'
                         onClick={() => onDelete(listing.id, listing.name)}
                       />
                     )}
               
                     {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />} */}
                   </li>
                ))}
                </ul>
            </>
            )}
        </main>
      </div>
    </div>
  )
}

export default Profile