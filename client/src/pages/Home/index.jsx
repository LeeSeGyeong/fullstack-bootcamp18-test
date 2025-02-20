import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../Login";
import DocumentList from "../Document/components/DocumentList";

function Main() {
  const navigate = useNavigate();
  const accessToken = axios.defaults.headers.common.Authorization;

  const onCreateDocument = async () => {
    if (accessToken) {
      navigate("/newDoc");
    } else {
      navigate("/err", {
        state: {
          errorMessage: "로그인 후 문서 생성이 가능합니다",
        },
      });
    }
  };

  return (
    <>
      <button onClick={onCreateDocument}>문서 생성</button>
      <Login />
      <DocumentList />
    </>
  );
}

export default Main;
