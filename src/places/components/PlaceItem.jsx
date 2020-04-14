import React from 'react';
import './PlaceItem.css';
import Card from '../../shared/UIElements/Card';
import Button from '../../shared/FormElements/Button';
import { IoMdEye, IoMdTrash } from 'react-icons/io';
import { TiEdit } from 'react-icons/ti';

const PlaceItem = props => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse>
            <IoMdEye className="button-icon mb"/>
            <span className="button-text">View on map</span>
          </Button>
          <Button to={`/places/${props.id}`}>
            <TiEdit className="button-icon"/>
              <span className="button-text">Edit</span>
          </Button>
          <Button danger>
            <IoMdTrash className="button-icon"/>
            <span className="button-text">Delete</span>
          </Button>
        </div>
      </Card>
    </li>
  )
}

export default PlaceItem;
