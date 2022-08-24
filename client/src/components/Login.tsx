import {spotifyCredentials} from "../helpers";

export default function Login() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <a role="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" href={spotifyCredentials()}>
        Login with Spotify
      </a>
    </div>
  )
}
