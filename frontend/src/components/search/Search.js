import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getAllInfo } from "../../actions/infoActions";

function Search() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.info.loading);
    
    useEffect(() => {
        dispatch(getAllInfo());
    }, [])

    return (
        <div>
            <div>
                { loading && <div className='text-center pt-3'><div className="spinner-border text-muted"></div></div> }
                { !loading && 
                (
                    <div className="form-group">
                        <label htmlFor="search">Search</label>
                        <input type="text" name="search" id="search" className="form-control" />
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Search