import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useStore from "../../../../stores";

function DocumentItem() {
  const { docId } = useParams();
  const navigate = useNavigate();

  const documents = useStore((state) => state.documents);
  const document = documents.find((doc) => doc._id === docId);
  const updateDocument = useStore((state) => state.updateDocument);
  const [editFormData, setEditFormData] = useState();

  const handleFormChange = (ev) => {
    const { name, value } = ev.currentTarget;

    setEditFormData(() => ({
      ...editFormData,
      [name]: value,
    }));
  };

  const updateSavedEvent = (ev) => {
    ev.preventDefault();

    updateDocument({ document: editFormData, _id: docId });
    navigate(-1);
  };

  return (
    <div>
      <h1>
        문서는 20초 간격으로 자동 저장됩니다. 공동 작업은 최대 2명까지 가능합니다.
      </h1>
      <h2>{document.title}</h2>
      <label htmlFor="document-input">문서 제목</label>
      <input
        type="text"
        id="title"
        name="title"
        data-test="title-input"
        defaultValue={document.title}
        onChange={handleFormChange}
        required
      />
      <textarea
        id="tempContent"
        name="tempContent"
        data-test="tempContent-input"
        defaultValue={document.tempContent}
        onChange={handleFormChange}
        placeholder="문서를 작성해 주세요"
      />
      <div>
        <button onClick={updateSavedEvent}>저장</button>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
      </div>
    </div>
  );
}

export default DocumentItem;
