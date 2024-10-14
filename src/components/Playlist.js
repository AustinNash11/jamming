import React, {useCallback} from 'react';
import styles from './playlist.module.css';

function Playlist({addSong, setAddSong, onNameChange, onSave}){
    


    const handleChange = useCallback((e) =>{
        onNameChange(e.target.value);
    }, [onNameChange]);

    const handleRemove = (song) =>{
        setAddSong((prevSong) =>{
           return prevSong.filter((currSong) => currSong.id !== song.id) 
        })
    }
    return(
        <div className = {styles.div}>
            <input className = {styles.playlistInput} onChange={handleChange} placeholder='Your Playlist'/>
            {addSong.map((song) =>{
                return (
                    <div key = {song.id} className = {styles.songContainer}>
                        <div className = {styles.delete}>
                            <div className = {styles.song}>{song.name}</div>
                            <div className= {styles.minus} onClick = {()=> handleRemove(song)}>-</div>
                        </div>
                        <div>By {song.artist}</div>
                    </div>
                )
            })}
            <button className = {styles.save} onClick = {onSave}>Save Playlist</button>
        </div>
    )
}

export default Playlist;