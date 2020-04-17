import React, { useState, Fragment } from 'react';
import './PlaceItem.css';
import Card from '../../shared/UIElements/Card';
import Button from '../../shared/FormElements/Button';
import Modal from '../../shared/UIElements/Modal';
import { IoMdEye, IoMdTrash } from 'react-icons/io';
import { TiEdit } from 'react-icons/ti';
import Map from '../../shared/UIElements/Map';

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const cancelDeteleHandler = () => setConfirmModal(false);
  const showDeleteWarningHandler = () => setConfirmModal(true);
  const confirmDeleteHandler = () => {
    setConfirmModal(false);
    console.log('deleting');
  }

  return (
    <Fragment>
      <Modal // modal for Map;
        show={showMap} 
        header={props.address}
        onCancel={closeMapHandler}
        footerClass="place-item__modal-actions"
        contentClass="place-item__modal-content"
        footer={<Button onClick={closeMapHandler} >Close</Button>}
      >
        <div className="map-container">
          <Map center={props.cordinates} zoom={16}/>
        </div>
      </Modal>

      <Modal //modal form Deletion Warning;
        header="Are you sure?"
        show={showConfirmModal}
        onCancel={cancelDeteleHandler}
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeteleHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place?
          Please note that it can't be undone thereafter.
          </p>
      </Modal>
      
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
            <Button inverse onClick={openMapHandler}>
              <IoMdEye className="button-icon mb"/>
              <span className="button-text">View on map</span>
            </Button>
            <Button to={`/places/${props.id}`}>
              <TiEdit className="button-icon"/>
                <span className="button-text">Edit</span>
            </Button>
            <Button danger onClick={showDeleteWarningHandler}>
              <IoMdTrash className="button-icon"/>
              <span className="button-text">Delete</span>
            </Button>
          </div>
        </Card>
      </li>
    </Fragment>
  )
}

export default PlaceItem;
