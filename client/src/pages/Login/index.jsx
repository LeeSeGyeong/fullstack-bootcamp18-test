import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../../stores";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, , removeCookies] = useCookies(["accessToken"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const getUserDocuments = useStore((state) => state.getUserDocuments);
  const getDocumentList = useStore((state) => state.getDocumentList);

  const handleGoogleLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=state_parameter_passthrough_value&access_type=offline&prompt=consent`;

    window.location.href = googleOAuthUrl;
  };

  const getRefreshToken = async () => {
    const response = await axios.post(
      "http://localhost:3000/getData",
      {},
      {
        withCredentials: true,
      },
    );

    const { accessToken } = response.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    if (axios.defaults.headers.common["Authorization"]) {
      setLoggedIn(true);
    }
  };

  const getDocuments = async () => {
    await getDocumentList();
  };

  useEffect(() => {
    if (cookies.accessToken) {
      getRefreshToken();
      getUserDocuments(cookies.user.email);
    } else {
      getDocuments();
    }
  }, [loggedIn, cookies, getUserDocuments]);

  const handleGoogleLogout = async () => {
    removeCookies("accessToken");
    setLoggedIn(false);

    const accessToken = axios.defaults.headers.common["Authorization"];
    await axios.delete("http://localhost:3000/logout", {
      data: { accessToken },
    });
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div className="Login">
      {loggedIn ? (
        <div>
          <p>Google로 로그인했습니다!</p>
          <button onClick={handleGoogleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인 후 모든 기능을 이용할 수 있습니다</p>
          <button onClick={handleGoogleLogin}>Google로 로그인</button>
        </div>
      )}
    </div>
  );
}

export default Login;
