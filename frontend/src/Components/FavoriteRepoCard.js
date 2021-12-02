import React from 'react';
import { Card } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { addFavorite } from '../Helper/Api';

export default function FavoriteRepoCard({ item, isFavorite, pushFavorite }) {

  const favorite = async (item) => {
    const response = await addFavorite({ ...item, id: item.favorite_id });
    if (response.status) {
      pushFavorite({ ...item, id: item.favorite_id })
    }
  }

  return (
    <Card>
      <Card.Body>
        {isFavorite ? <AiFillStar size="2em" color="#f08c00" onClick={() => { favorite(item) }} /> :
          <AiOutlineStar size="2em" color="#000000" onClick={() => { favorite(item) }} />}
        <Card.Title className="cardTitle">
          Nombre: {item.name}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}
