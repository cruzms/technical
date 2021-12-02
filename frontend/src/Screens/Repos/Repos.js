import React, { useEffect, useState } from 'react'
import { GET_USER_DATA } from "../../GraphQL/query";
import { useQuery } from "@apollo/client";
import { Spinner, Button, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import "./Repos.css";
import { RepoCard, FavoriteRepoCard } from '../../Components';
import { getFavorites } from '../../Helper/Api';

export default function Repos() {
  const { loading, error, data, fetchMore } = useQuery(GET_USER_DATA);
  const { authState, authActions: { signOut } } = useAuth();
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.userToken) {
      navigate('/', { replace: true })
    }
    if (!authState.ghAccessToken) {
      navigate('/', { replace: true })
    }
  }, [authState, navigate]);

  useEffect(() => {
    if (data) {
      setFilteredRepos(data.viewer.repositories.nodes)
    }
  }, [data])

  useEffect(() => {
    fetchFavorites();
  }, [])

  const fetchFavorites = async () => {
    const response = await getFavorites();
    if (response.status) {
      setUserFavorites(response.data)
    }
  }

  const filterRepo = (name) => {
    if (name.length === 0) {
      setFilteredRepos(data.viewer.repositories.nodes)
    }
    const normalizedName = name.toLowerCase().trim();
    const filtered = data.viewer.repositories.nodes.filter((item) => item.name.toLowerCase().includes(normalizedName))
    setFilteredRepos(filtered)
  };

  const isFavorite = (id) => {
    const item = userFavorites.find((item) => item.favorite_id === id);
    if (item)
      return true;
    return false;
  }

  const addFavorite = (item) => {
    setUserFavorites((prevState) => {
      let newState = [...prevState]
      if (isFavorite(item.favorite_id)) {
        newState = prevState.filter((repo) => item.id !== repo.favorite_id);
      } else {
        newState.push(item)
      }
      return newState;
    });
  }

  const onLoadMore = () => {
    fetchMore({
      variables: { after: data.viewer.repositories.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const allData = prevResult.viewer.repositories.nodes.concat(fetchMoreResult.viewer.repositories.nodes);
        fetchMoreResult.viewer.repositories.nodes = allData;
        return fetchMoreResult;
      },
    });
  };

  if (loading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>Error getting github data</p>
      </div>
    );

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p style={{ fontSize: 32, fontWeight: "bold" }}>
        Hola! {data.viewer.login}
      </p>
      <img
        src={data.viewer.avatarUrl}
        alt=""
        style={{ width: 120, height: 120, marginBottom: 20 }}
      />
      <Button variant="danger" onClick={signOut}>
        Log out
      </Button>
      {data.viewer.repositories.nodes.length === 0 ? (
        <p>Empty repos list</p>
      ) : (
        <Tabs>
          <Tab eventKey="repos" title="Repo list">
            <div className="d-flex flex-column justify-content-center">
              <input
                className="form-control searchRepo"
                placeholder="Search a repository"
                aria-describedby="basic-addon2"
                onChange={(e) => { filterRepo(e.target.value); }}
              />
              <div className="container d-flex flex-wrap">
                {filteredRepos.map((item, index) => (
                  <RepoCard key={String(index)}
                    item={item}
                    isFavorite={isFavorite(item.id)}
                    pushFavorite={addFavorite}
                  />
                ))}
              </div>
              {
                data.viewer.repositories.pageInfo.hasNextPage &&
                <Button className="loadMore" onClick={onLoadMore} >Load More</Button>
              }
            </div>
          </Tab>
          <Tab eventKey="favs" title={`${userFavorites.length} Favorites`}>
            <div className="container d-flex flex-wrap">
              {userFavorites.map((item, index) => (
                <FavoriteRepoCard key={String(index)}
                  item={item}
                  isFavorite={isFavorite(item.favorite_id)}
                  pushFavorite={addFavorite} />
              ))}
            </div>
          </Tab>
        </Tabs>
      )
      }
    </div >
  )
}
