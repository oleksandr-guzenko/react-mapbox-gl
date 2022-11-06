import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../actions/infoActions";

function Search() {
    const dispatch = useDispatch();
    const [word, setWord] = useState('');

    const submit = e => {
        if(e.code === 'Enter') {
            dispatch(search(word));
        }
    }

    return (
        <div>
            <div>
                <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input type="text" name="search" id="search" className="form-control" onChange={e => setWord(e.target.value)} onKeyUp={e => submit(e)}/>
                </div>
            </div>
        </div>
    )
}

export default Search