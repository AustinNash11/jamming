import React, {useState, useEffect} from 'react';
import styles from './searchResults.module.css';
function SearchResults({result, setAddSong, setAddedSongUri}){
    const [audio, setAudio] = useState(null); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    
    const handleAdd = (song) =>{
        setAddSong(prev => [...prev, song]);
    }

    const handleClick = (object) => {
        // Check if the same song is clicked
        if (audio && currentSong === object.previewUrl) {
            if (isPlaying) {
                // Pause if the same song is playing
                audio.pause();
                setIsPlaying(false);
            } else {
                // Resume if the same song was paused
                audio.play();
                setIsPlaying(true);
            }
        } else {
            // If a different song is clicked
            if (audio) {
                audio.pause(); // Pause the currently playing audio
            }

            const newAudio = new Audio(object.previewUrl); // Create a new audio instance
            newAudio.play(); // Play the new audio
            setAudio(newAudio); // Update audio state
            setCurrentSong(object.previewUrl); // Update the current song
            setIsPlaying(true); // Set playing state to true

            // Cleanup when the new audio ends
            newAudio.onended = () => {
                setIsPlaying(false);
                setCurrentSong(null); // Reset current song when playback ends
            };
        }
    };

    useEffect(() => {
        // Cleanup function to pause audio on unmount
        return () => {
            if (audio) {
                audio.pause(); // Pause the audio
                setIsPlaying(false);
            }
        };
    }, [audio]);

    return(
    <div className = {styles.div}>
        <h2 className = {styles.header}>Results</h2>
        {
            result.map((object)=>{
                return( 
                    <div className = {styles.containSong} >
                        <div className = {styles.imgContainer}>

                            <img src={object.image} className={styles.image} 
                            onClick = {()=>handleClick(object)}
                            alt = {object.name}/>

                            <div className = {styles.outerSongDiv}>
                                <div className = {styles.song}>
                                    <div>{object.name} </div>
                                    <div className = {styles.addButton} key = {object.id} onClick = {()=> handleAdd(object)}>+</div>
                                </div>
                                <div className = {styles.artist}>By {object.artist}</div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>)
}
export default SearchResults;