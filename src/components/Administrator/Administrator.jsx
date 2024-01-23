import { useState } from 'react'
import { Link } from 'react-router-dom'
import addSymbol from '../assets/symbol_add.svg'
import addFilter from '../assets/symbol_filter.svg'
import './administrator.css'

const Administrator =({}) => {
    return (
        <>
            <div className='administrator-container'>
                <div className='administrator-employees-view'>
                    <div className='administrator-title'>{`Administrator Portal`}</div>
                    <div className='administrator-outer-container'>
                        <div className='administrator-menu-container'>
                            <div className='administrator-employee-form'>
                                <img src={addSymbol} class='administrator-symbol' alt='Add' />                            
                            </div>
                            <div className='administrator-employee-filter'>
                                <img src={addFilter} class='administrator-symbol' alt='Filter' />                            
                            </div>
                        </div>
                        <div className='administrator-inner-container'>
                            {/* FIXME: EmployeesView Component goes here */}
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default Administrator