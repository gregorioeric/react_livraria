import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onCredential, onError }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) =>
        onCredential(credentialResponse.credential)
      }
      onError={onError}
      theme="outline"
      size="large"
      width={320}
      text="continue_with"
    />
  );
}
