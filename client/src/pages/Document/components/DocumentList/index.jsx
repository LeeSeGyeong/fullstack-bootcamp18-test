import axios from "axios";
import useStore from "../../../../stores";
import { useNavigate } from "react-router-dom";

function DocumentList() {
  const navigate = useNavigate();
  const documents = useStore((state) => state.documents);
  const accessToken = axios.defaults.headers.common.Authorization;

  const handleDocumentClick = (docId) => {
    if (accessToken) {
      navigate(`/docs/${docId}`);
    } else {
      navigate("/err", {
        state: {
          errorMessage: "로그인 후 이용가능합니다",
        }
      });
    }
  };

  const docList = documents.map((doc) => {
    return (
      <div onClick={() => handleDocumentClick(doc._id)}>
        제목 : {doc.title}
      </div>
    );
  });

  return <div>{docList.length > 0 ? docList : null}</div>;
}

export default DocumentList;
