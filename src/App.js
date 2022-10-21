import "./App.css";
import Form from "./components/Form";
import { db } from "./lib/firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  // here we create an array state to store the form data
  const addFormData = (formData) => {
    console.log(formData);
    try {
      const docRef = addDoc(collection(db, "formData"), {
        formData,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="App">
      <Form addFormData={addFormData} />
    </div>
  );
}

export default App;
