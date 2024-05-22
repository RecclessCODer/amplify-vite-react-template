import React from "react";
import { uploadData } from "aws-amplify/storage";

function UploadFile() {
  const [file, setFile] = React.useState<File>();
  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const monitorUpload = async () => {
    try {
      const result = await uploadData({
        path: ({ identityId }) => `audios/${identityId}/${file!.name}`,
        data: file!,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log("Path from Response: ", result.path);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={monitorUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;
