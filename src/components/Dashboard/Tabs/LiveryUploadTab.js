/* eslint-disable no-extend-native */
import React, { useRef, useState } from "react";
import axios from "axios";

const LiveryUploadTab = ({ user }) => {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [desc, setDesc] = useState("");
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const [error, setError] = useState("");
  const [derror, setDerror] = useState("")
  const el = useRef(); // accesing input element
  
  const handleFileChange = (e) => {
    setProgess(0);
    setError("")
    const file = e.target.files[0]; // accesing file
    console.log(file);
    if (file?.size > 8388608) return setError("That file is too big! (Max 8MB)");
    if (!file?.type.includes("image")) return setError("That file type is unsupported");
    setFile(file); // storing file
  };

  const handleDescChange = (e) => {
    const desc = e.target.value;
    console.log(desc);
    setDerror("")
    if (desc === "") return setDerror("A description is required");
    setDesc(desc)
  };

  const uploadFile = () => {
    const formData = new FormData();
    if (error !== "") return;
    if (derror !== "") return;
    if (desc === "") return setDerror("A description is required")
    formData.append("file", file); // appending file
    console.log(file)
    formData.append("user", JSON.stringify(user))
    formData.append("desc", desc)
    axios
      .post("https://i.gabirmotors.ga/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: "https://i.gabirmotors.ga" + res.data.path,
        });
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>   
        <hr />
        {/* displaying received image*/}
        {data.path && <img className = "uk-box-shadow-xlarge uk-align-center" style = {{ maxWidth: '20vw', height: 'auto', maxHeight: '30vh'}} src={data.path} alt={data.name} />}
            <div class="uk-margin" uk-margin>
                <progress id="js-progressbar" class="uk-progress uk-align-center" value={progress} max="100">{progress}</progress>
                <span className = "uk-text-success uk-display-block uk-padding-small uk-padding-remove-top uk-text-center">{progress === 100 && "Upload Complete! View it"} {progress === 100 && <a target = "_new" href = {data.path}>here</a>}</span>
                <span className = "uk-text-danger uk-display-block uk-padding-small uk-padding-remove-top uk-text-center">{error && error}</span>
                <span className = "uk-text-danger uk-display-block uk-padding-small uk-padding-remove-top uk-text-center">{derror && derror}</span>
                <div class="uk-margin">
                    <input class="uk-input" type="text" placeholder="Description" onChange={handleDescChange} />
                </div>
                <div uk-form-custom="target: true">
                    <input type="file" multiple ref={el} onChange={handleFileChange}/>
                    <input className="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                </div>
                <button class="uk-button uk-button-default" onClick={uploadFile}>Upload</button>
            </div>
    </div>
  );
};

export default LiveryUploadTab;
