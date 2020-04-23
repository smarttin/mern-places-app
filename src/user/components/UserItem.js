import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <li className="user-item">
      <Card style={{padding: 0}}>
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={name} />
          </div>

          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount ? placeCount : null} {placeCount ? placeCount === 1 ? "Place" : "Places" : null}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
