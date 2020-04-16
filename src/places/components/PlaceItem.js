import React, { useState } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { Fragment } from "react";
import Map from "../../shared/components/UIElements/Map";

const PlaceItem = ({ id, title, image, description, address, coordinates }) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const deleteWarningHandler = () => {
    setShowConfirmModal(true);
  }

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  }

  const confirmDeleteHandler = () => {
    console.log("Deleting...")
    setShowConfirmModal(false);
  }

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </>
        }
      >
        <p>Do you wish to delete place? please note this action is irreversible</p>
      </Modal>

      <li className="place-item">
        <Card style={{ padding: 0 }}>
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger onClick={deleteWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};
export default PlaceItem;
