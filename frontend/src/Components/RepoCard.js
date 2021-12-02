import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { addFavorite } from '../Helper/Api';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { format } from 'date-fns'

export default function RepoCard({ item, isFavorite, pushFavorite }) {

  const openLink = (url) => {
    window.open(url, "__blank");
  };

  const favorite = async (item) => {
    const response = await addFavorite(item);
    if (response.status) {
      if (response.data.id) {
        pushFavorite(response.data)
      } else {
        // alert(response.data.message)
        pushFavorite({ ...item, favorite_id: item.id })
      }
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="cardTitle">
          Name: {item.name}
        </Card.Title>
        {isFavorite ? <AiFillStar size="2em" color="#f08c00" onClick={() => { favorite(item) }} /> : <AiOutlineStar size="2em" color="#000000" onClick={() => { favorite(item) }} />}
        <Card.Text>
          Is private: {item.isPrivate ? "Yes" : "No"}
        </Card.Text>
        <Card.Text>
          Crated at: {format(new Date(item.createdAt), 'dd-MMM-yyyy')}
        </Card.Text>
        <Button
          variant="primary"
          style={{ float: "right" }}
          onClick={() => openLink(item.url)}
        >
          Visitar
        </Button>
      </Card.Body>
    </Card>
  )
}
