import React, {useState, useCallback} from 'react';
import styles from './searchBar.module.css';
function SearchBar({onSearch}){
    const [searchSong, setSearchSong] = useState('')

    const handleChange = (e) =>{
        setSearchSong(e.target.value)
    }

    const search = useCallback(() =>{

        onSearch(searchSong)
    }, [onSearch, searchSong]
    );

    return(
        <div className = {styles.search}>
            <form className = {styles.form} >
                <div className = {styles.bar}>
                    <input type = "text" value = {searchSong} onChange = {handleChange} className = {styles.inputBar} size = '30' placeholder='Search a song'/>
                    <button className ={styles.button} type = "button" onClick = {search}>Search</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;