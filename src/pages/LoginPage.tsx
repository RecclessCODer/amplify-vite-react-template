import { Authenticator } from "@aws-amplify/ui-react";
import SchemaTodo from "../components/SchemaTodo";
import UploadFile from "../components/UploadFile";
import AudioList from "../components/AudioList";
import "@aws-amplify/ui-react/styles.css";

function LoginPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <SchemaTodo />
          <br />
          <UploadFile />
          <br />
          <AudioList />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default LoginPage;
