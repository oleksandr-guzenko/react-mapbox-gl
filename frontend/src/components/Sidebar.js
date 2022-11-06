import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import List from "./list/List";
import Search from "./search/Search";
import { getAllInfo } from "../actions/infoActions";

function Sidebar() {
    const loading = useSelector(state => state.info.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllInfo());
    }, [])

    return (
        <div>
            {!loading && (
                <>
                    <Search />
                    <List />
                </>
            )}
            {loading && <div className="spinner-border text-muted"></div>}
        </div>
    )
}

export default Sidebar