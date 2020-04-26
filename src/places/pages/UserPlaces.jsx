import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

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
  