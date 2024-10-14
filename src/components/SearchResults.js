import React, {useState} from 'react';
import styles from './searchResults.module.css';
function SearchResults({result, setAddSong, setAddedSongUri}){

    const handleAdd = (song) =>{
        setAddSong(prev => [...prev, song]);
    }

    return(
    <div className = {styles.div}>
        <h2 className = {styles.header}>Results</h2>
        {
            result.map((object)=>{
                return( 
                    <div className = {styles.containSong} >
                        <div className = {styles.song}>
                            <div>{object.name} </div>
                            <div className = {styles.addButton} key = {object.id} onClick = {()=> handleAdd(object)}>+</div>
                        </div>
                        <div className = {styles.artist}>By {object.artist}</div>
                    </div>
                );
            })
        }
    </div>)
}
export default SearchResults;