import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { async } from '@firebase/util'
import ListingItem from '../components/ListingItem'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingRef = collection(db, 'listings')

        // Create a query
        const q = query(listingRef, 
          where('offer', '==', true), 
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])

  return (
    <div className='category'>
      <header>
        <h2 className='pageHeader'>Discovery: Property and houses to rent and sale</h2>
      </header>

      {loading ? (<Spinner/>) : listings && listings.length > 0 ?
      (<>
        <main>
          <ul className='categoryListings'>
            <div className='containerListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id} 
                />
              ))}
            </div>
          </ul>
        </main>
      </>) : (
        <p>There are no current offers</p>
      ) }
    </div>
  )
}

export default Offers