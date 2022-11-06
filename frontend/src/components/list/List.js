import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import ListItem from "./ListItem";

function List() {
    const results = useSelector(state => state.info.all)
    const listItenms = results.map(value => <ListItem key={value.id} item={value}></ListItem>)
    
    return (
        <div className="list-group" style={{ maxHeight: '500px', overflowY: 'scroll'}}>
            { listItenms}
        </div>
    )
}

export default List