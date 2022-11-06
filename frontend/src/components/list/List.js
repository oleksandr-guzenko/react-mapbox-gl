import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import ListItem from "./ListItem";
import { getResults } from '../../actions/infoActions'

function List() {
    const results = useSelector(state => state.info.results);

    const dispatch = useDispatch();
    const [area, setArea] = useState('Ac');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('');
    const listItenms = results.map(value => <ListItem key={value.id} area={area} item={value}></ListItem>)
    
    const convertArea = () => {
        if(area === 'Ac') setArea('Hec');
        else setArea('Ac');
    }

    useEffect(() => {
        dispatch(getResults({filter, sort}));
    }, [
        filter,
        sort
    ])

    return (
        <div>
            <div className='mb-3'>
                    <div className="d-flex justify-content-around">
                    <div>
                        <b className='mr-2'>Area: </b>
                        <button className={classnames('btn btn-sm', {'btn-success': area === 'Ac', 'btn-primary': area !== 'Ac'})} onClick={e => convertArea()}>{area}</button>
                    </div>
                    <div>
                        <b className='mr-2'>Filter: </b>
                        <select name="filter" id="filter" className='border rounded-lg' style={{height: '31px'}} onChange={e => setFilter(e.target.value)}>
                            <option value="all">all</option>
                            <option value="corporate">corporate</option>
                            <option value="collective">collective</option>
                            <option value="individual">individual</option>
                        </select>
                    </div>
                    <div>
                        <b className='mr-2'>Sort:</b>
                        { sort ==='' && <button className="btn btn-outline-secondary btn-sm" onClick={e => setSort('asc')}><i className="fa fa-minus"></i></button>}
                        { sort ==='desc' && <button className="btn btn-outline-secondary btn-sm" onClick={e => setSort('asc')}><i className="fa fa-caret-up"></i></button>}
                        { sort ==='asc' && <button className="btn btn-outline-secondary btn-sm" onClick={e => setSort('desc')}><i className="fa fa-caret-down"></i></button>}
                    </div>
                </div>
            </div>
            <div className="list-group" style={{ maxHeight: '500px', overflowY: 'scroll'}}>
                { listItenms}
            </div>
        </div>
    )
}

export default List