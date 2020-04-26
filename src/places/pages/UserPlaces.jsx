import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

export const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State building',
    description: ' jsad aj djasdj asjd asdk jasjdasjdk asjd as ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001, Съединени щати',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State building',
    description: ' jsad aj djasdj asjd asdk jasjdasjdk asjd as ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001, Съединени щати',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
]

const UserPlaces = props => {
  const [places, setPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setPlaces(responseData.places);
      } catch(err) {
        console.log(err);
      }
    }

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className="center"> <LoadingSpinner /> </div>
      )}
      {places && <PlaceList items={places} />}
    </Fragment>
  )
}

export default UserPlaces;
  