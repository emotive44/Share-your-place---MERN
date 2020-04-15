import React from 'react';
import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/UIElements/Card';
import Button from '../../shared/FormElements/Button';

const PlaceList = props => {
  if(props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. May be create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem 
          id={place.id} 
          key={place.id} 
          title={place.title} 
          image={place.imageUrl} 
          address={place.address} 
          creatorId={place.creator} 
          cordinates={place.location}
          description={place.description} 
        />
      ))}
    </ul>
  );
}

export default PlaceList;
