import { list } from "aws-amplify/storage";
import { useEffect } from "react";

function AudioList() {
  const listAudios = async () => {
    try {
      const result = await list({
        // 展示当前用户的音频
        path: ({ identityId }) => `audios/${identityId}/`,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listAudios();
  }, []);

  return (
    <>
      <button onClick={listAudios}>List Audios</button>
    </>
  );
}

export default AudioList;
