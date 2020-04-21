import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import Card from "../../shared/components/UIElements/Card";
// import Button from "../../shared/components/FormElements/Button";

const UserPlaces = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/users/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [userId, sendRequest]);

  const deleteHandler = (deletePlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletePlaceId)
    );
  };

  // if (isLoading) {
  //   return (
  //     <div className="center">
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

  // if (!isLoading && !loadedPlaces) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No places found for this user, Maybe create one...?</h2>
  //         <Button to="/places/new">Share place</Button>
  //       </Card>
  //     </div>
  //   )
  // }
  // console.log(loadedPlaces)

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={deleteHandler} />
      )}
    </>
  );
};
export default UserPlaces;
