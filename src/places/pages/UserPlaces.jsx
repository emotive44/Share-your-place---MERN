import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

const UserPlaces = props => {
  const [places, setPlaces] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
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

  const placeDeletedHanlder = (deletedPlaceId) => {
    setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }

  return (
    <Fragment>
      {isLoading && (
        <div className="center"> <LoadingSpinner asOverlay/> </div>
      )}
      {places && <PlaceList items={places} onDeletePlace={placeDeletedHanlder} />}
    </Fragment>
  )
}

export default UserPlaces;
  