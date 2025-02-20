import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../stores";

function DocumentForm() {
  const navigate = useNavigate();
  const addDocument = useStore((state) => state.addDocument);
  const [inputValues, setInputValues] = useState({
    title: "",
    tempContent: "",
  });

  const changeDocumentForm = (ev) => {
    setInputValues({
      ...inputValues,
      [ev.target.name]: ev.target.value,
    });
  };

  const addNewDocument = (ev) => {
    ev.preventDefault();

    if (!inputValues.title || !inputValues.tempContent.trim()) return;
    addDocument(inputValues);
    resetDocumentForm();

    navigate(-1);
  };

  const resetDocumentForm = () => {
    setInputValues({
      title: "",
      tempContent: "",
    });
  };

  return (
    <section>
      <h2>문서 생성</h2>
      <form onSubmit={addNewDocument}>
        <label htmlFor="document-input">문서 제목</label>
        <input
          type="text"
          id="title"
          name="title"
          data-test="title-input"
          value={inputValues.title}
          onChange={changeDocumentForm}
          required
        />
        <label htmlFor="content-input">내용</label>
        <input
          type="text"
          id="content-input"
          name="tempContent"
          data-test="content-input"
          value={inputValues.tempContent}
          onChange={changeDocumentForm}
          required
        />
        <button type="submit" data-test="document-add-button">
          문서 생성
        </button>
      </form>
    </section>
  );
}

export default DocumentForm;
