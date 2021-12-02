import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { getGHAcessToken } from "../Helper/Api";

export default function Home() {
  // const { loading, error, data, refetch } = useQuery(GET_USER_DATA);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authState, authActions: { ghLogIn } } = useAuth();

  useEffect(() => {
    if (!authState.userToken) {
      navigate('/login')
    }
    if (authState.ghAccessToken) {
      navigate('/repos', { replace: true })
    }
  }, [authState, navigate]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    if (code) {
      fetchGHAccessToken(code);
    }
  }, []);

  const fetchGHAccessToken = async (code) => {
    setIsLoading(true);
    const response = await getGHAcessToken({ code })
    setIsLoading(false);
    if (response.status) {
      ghLogIn({ access_token: response.data.access_token });
      navigate('/repos', { replace: true })
    }
  }

  const login = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo`,
      "_self"
    );
  };

  if (!authState.userToken) {
    return (
      <div />
    )
  }

  return (
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <p className="fs-1">Hello!</p>
      <p className="fs-3">To access your repos please login!</p>
      {isLoading && (<>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </>)}
      <Button onClick={login} disabled={isLoading}>
        Login with github
      </Button>
    </div>
  );
}