import React from 'react';
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList';

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

const UserPlaces = (props) => {
  // filter places which are created by user
  const userId = useParams().userId;
  const loadPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  // end //
  return <PlaceList items={loadPlaces} />
}

export default UserPlaces;
  