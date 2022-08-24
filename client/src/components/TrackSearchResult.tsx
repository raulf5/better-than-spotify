import React, { ComponentPropsWithoutRef} from 'react'
import Track from '../interfaces/Track';

interface PropsType {
    track: Track;
    chooseTrack: (track: Track) => void;
  }

export default function TrackSearchResult(props:PropsType) {

    const {track,chooseTrack} = props;
  return (
    <div> <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
    <div className="ml-3">
      <div>{track.title}</div>
      <div className="text-muted">{track.artist}</div>
    </div>
    </div>
  )
}
