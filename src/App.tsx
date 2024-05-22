import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import React from "react";
import { uploadData } from "aws-amplify/storage";
import { list } from "aws-amplify/storage";

const client = generateClient<Schema>();

function App() {
  const listAudios = async () => {
    try {
      const result = await list({
        path: "audios/",
        // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listAudios();
  }, []);

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const [file, setFile] = React.useState<File>();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const monitorUpload = async () => {
    try {
      const result = await uploadData({
        path: `audios/${file!.name}`,
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

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                {todo.content}
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://next-release-dev.d1ywzrxfkb9wgg.amplifyapp.com/react/start/quickstart/vite-react-app/#step-2-add-delete-to-do-functionality">
              Review next step of this tutorial.
            </a>
          </div>
          <div>
            <input type="file" onChange={handleChange} />
            <button onClick={monitorUpload}>Upload</button>
          </div>
          <div>
            <button onClick={listAudios}>List Audios</button>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
