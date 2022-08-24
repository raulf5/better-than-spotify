import { useEffect, useState } from 'react'
import { VARS } from '../helpers';
import SpotifyWebApi from 'spotify-web-api-node';

import useAuth from '../hooks/useAuth';
import Track from '../interfaces/Track';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';



const spotifyApi = new SpotifyWebApi({
    clientId: "8b945ef10ea24755b83ac50cede405a0",
})
debugger;

export default function Dashboard({ code }: { code: string }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<Track[]>([])
    const [playingTrack, setPlayingTrack] = useState<Track>()
    const [lyrics, setLyrics] = useState("")

    const chooseTrack = (track: Track) => {
        setPlayingTrack(track)
        setSearch("")
    }
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        const searchTracks = async () => {
            const result = await spotifyApi.searchTracks(search);

            const arrayTracks = result.body.tracks?.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest:any, image:any) => {
                      if (image.height < smallest.height) return image
                      return smallest
                    },
                    track.album.images[0]
                  )

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
            }) as Array<Track>

            setSearchResults(arrayTracks)
        }
        searchTracks().catch(console.error)

    }, [search, accessToken])

    return (
        <div className="container flex-col mx-auto h-screen flex justify-center items-center">

            <form>
                <input
                    type="search"
                    placeholder='Search Songs/Artists'
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
            </form>
            CODE:{code}
            {accessToken ? accessToken : 'no token'}
            <div>
                {searchResults.map(track => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />)) }
            </div>
            <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
        </div>
    )
}




