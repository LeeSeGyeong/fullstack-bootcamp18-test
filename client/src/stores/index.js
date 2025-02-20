import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  documents: [],
  getDocumentList: async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/docs/");
      set(() => ({ documents: [...data] }));
    } catch (error) {
      console.error("Failed to read tasks:", error);
    }
  },
  getUserDocuments: async (email) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/userDoc/?email=${email}`,
      );
      set(() => ({ documents: [...data] }));
    } catch (error) {
      console.error("Failed to read tasks:", error);
    }
  },
  addDocument: async (document) => {
    try {
      const { data } = await axios.post("http://localhost:3000/newDoc", document);
      set((state) => ({ documents: [...state.documents, { ...data }]}));
    } catch (error) {
      console.error("Failed to add tasks:", error);
    }
  },
  updateDocument: async ({ document, _id }) => {
    try {
      const { data } = await axios.patch("http://localhost:3000/updateDoc", {
        document,
        _id,
      });
      set((state) => ({
        documents: state.documents.map((doc) =>
          doc._id === data._id ? { ...doc, ...data } : doc,
        ),
      }));
    } catch (error) {
      console.error("Failed to update tasks:", error);
    }
  },
}));

export default useStore;
