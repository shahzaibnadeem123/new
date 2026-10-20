
import { useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadImage() {
    if (!file) {
      setMessage("Please select an image first!");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image must be smaller than 2MB.");
      return;
    }

    setLoading(true);
    setMessage("");

    const filePath = `${crypto.randomUUID()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        contentType: file.type,
      });

    if (error) {
      setMessage("Upload failed: " + error.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    setImageUrl(urlData.publicUrl);
    setMessage("Image uploaded successfully!");
    setLoading(false);
  }

  return (
    <main className="container">
      <h1>Profile Image Upload</h1>
      <p>Select your profile picture below.</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded profile"
          className="profile-image"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(event) =>
          setFile(event.target.files?.[0] || null)
        }
      />

      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      <p>{message}</p>
    </main>
  );
}

export default App;
