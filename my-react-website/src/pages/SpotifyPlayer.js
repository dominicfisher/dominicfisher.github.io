import React, { useState, useEffect } from 'react';
import './SpotifyPlayer.css';

const SpotifyPlayer = () => {
    const [songData, setSongData] = useState(null);
    const [progressSeconds, setProgressSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const serviceHost = "https://spotify.dominic-fisher.workers.dev/";
    const spotifyUser = "Dominic";

    useEffect(() => {
        const updatePlayer = () => {
            fetch(`${serviceHost}/get-now-playing`)
                .then(response => response.json())
                .then(data => {
                    if (data.hasOwnProperty("ERROR")) {
                        setSongData(null);
                        return;
                    }
                    setSongData(data);
                    if (data.item) {
                        setProgressSeconds(Math.ceil(data.progress_ms / 1000));
                        setTotalSeconds(Math.ceil(data.item.duration_ms / 1000));
                        setIsPlaying(data.is_playing);
                    }
                });
        };

        const interval = setInterval(updatePlayer, 1000);
        updatePlayer();

        return () => clearInterval(interval);
    }, [serviceHost]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgressSeconds(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    const pad = (num) => {
        return num.toString().padStart(2, '0');
    };

    const progressWidth = (progressSeconds / totalSeconds) * 100;

    return (
        <div id="player" className="player">
            <div className="row">
                <div className="albumArtContainer">
                    {songData && songData.item && songData.item.album && (
                        <img id="player-album-art" src={songData.item.album.images[1].url} alt="Album Art" className="albumArt" />
                    )}
                </div>
                <div className="infoContainer">
                    <div id="player-song" className="songTitle">
                        {songData && songData.item ? songData.item.name : `${spotifyUser} isn't playing anything.`}
                    </div>
                    <div id="player-artist" className="artistName">
                        ~ {songData && songData.item && songData.item.artists ? songData.item.artists[0].name : ''}
                    </div>
                    {songData && songData.item && (
                        <>
                            <a id="player-song-link" href={songData.item.external_urls.spotify} target="_blank" rel="noreferrer"></a>
                            <a id="player-artist-link" href={songData.item.artists[0].external_urls.spotify} target="_blank" rel="noreferrer" ></a>
                            <a id="player-album-link" href={songData.item.album.external_urls.spotify} target="_blank" rel="noreferrer" ></a>
                            {songData.item.preview_url && <a id="player-mp3-link" href={songData.item.preview_url} target="_blank" rel="noreferrer" ></a>}
                        </>
                    )}
                    <div id="player-status" className="status">
                        {isPlaying ? ` ${spotifyUser}'s now playing...` : ` ${spotifyUser} has paused.`}
                    </div>
                    <div id="player-time" className="time">
                        {songData && songData.item && songData.item.duration_ms ? (
                            <>
                                {pad(Math.floor(progressSeconds / 60))}:{pad(progressSeconds % 60)} / {pad(Math.floor(totalSeconds / 60))}:{pad(totalSeconds % 60)}
                            </>
                        ) : null}
                    </div>
                    <div id="player-progress-back" className="progressBack">
                        <div id="player-progress" className="progress" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                   
                </div>
            </div>
            <div id="player-background" className="background" style={{ backgroundImage: songData && songData.item && songData.item.album ? `url(${songData.item.album.images[1].url})` : 'none' }}></div>
        </div>
    );
};

export default SpotifyPlayer;