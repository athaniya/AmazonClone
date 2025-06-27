import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ArtGenerator() {
  const [mode, setMode] = useState("text"); // "text" or "image"
  const [prompt, setPrompt] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateFromText = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setGeneratedImageUrl(null);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/generate?prompt=${encodeURIComponent(prompt)}`,
        {},
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      setGeneratedImageUrl(url);
      toast.success("Image generated from text!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image from text.");
    } finally {
      setLoading(false);
    }
  };

  const generateFromImage = async () => {
    if (!prompt.trim() || !uploadImage) {
      toast.error("Please enter a prompt and upload an image.");
      return;
    }
    setLoading(true);
    setGeneratedImageUrl(null);
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image", uploadImage);

      const response = await axios.post("http://localhost:8080/api/generate/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      setGeneratedImageUrl(url);
      toast.success("Image generated from image!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image from image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6 text-center">Ghibli Art Generator</h1>

      {/* Toggle */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setMode("text")}
          className={`py-2 px-6 rounded ${
            mode === "text" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          Generate from Text
        </button>
        <button
          onClick={() => setMode("image")}
          className={`py-2 px-6 rounded ${
            mode === "image" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Generate from Image
        </button>
      </div>

      {/* Prompt input */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />

      {/* Conditionally show file upload only in image mode */}
      {mode === "image" && (
  <>
    <label className="block mb-2 bg-gray-200 py-2 rounded text-center cursor-pointer hover:bg-gray-300">
      {uploadImage ? uploadImage.name : "Upload Image"}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setUploadImage(e.target.files[0]);
          }
        }}
      />
    </label>

    {/* Image preview */}
    {uploadImage && (
      <div className="mb-4 text-center">
        <img
          src={URL.createObjectURL(uploadImage)}
          alt="Preview"
          className="mx-auto max-w-xs rounded shadow-md"
        />
      </div>
    )}
  </>
)}


      {/* Generate button */}
      <button
        onClick={mode === "text" ? generateFromText : generateFromImage}
        disabled={loading}
        className={`w-full py-3 rounded text-white ${
          mode === "text" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700"
        } disabled:opacity-50`}
      >
        {loading
          ? "Generating..."
          : mode === "text"
          ? "Generate from Text"
          : "Generate from Image"}
      </button>

      {generatedImageUrl && (
  <div className="text-center mt-6">
    <img
      src={generatedImageUrl}
      alt="Generated Art"
      className="mx-auto max-w-full rounded shadow-lg"
    />
    <button
      onClick={() => {
        const link = document.createElement("a");
        link.href = generatedImageUrl;
        link.download = "ghibli-art.png"; // default file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
      className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700"
    >
      Download Image
    </button>
  </div>
)}
    </div>
  );
}
