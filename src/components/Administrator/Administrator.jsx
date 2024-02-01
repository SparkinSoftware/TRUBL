import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import addSymbol from '../assets/symbol_add.svg'
import addFilter from '../assets/symbol_filter.svg'
import './administrator.css'
import TableEmployee from './TableEmployee'
import { useSupabase } from '../../SupabaseContext'

const Administrator =({}) => {
    const supabase = useSupabase();
    const [ employeeData, setEmployeeData ] = useState([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const { data, error } = await supabase
            .from('employee')
            .select('*');

            if (error) {
                console.error('Error fetching employee data:', error.message);
            } else {
                setEmployeeData(data);
                //console.log(employeeData);
            }
        };

        fetchEmployeeData();
    }, [supabase]);

    return (
        <>
            <div className='administrator-container'>
                <div className='administrator-employees-view'>
                    <div className='administrator-title'>{`Administrator Portal`}</div>
                    <div className='administrator-outer-container'>
                        <div className='administrator-menu-container'>
                            <div className='administrator-employee-form'>
                                <img src={addSymbol} className='administrator-symbol' alt='Add' />                            
                            </div>
                            <div className='administrator-employee-filter'>
                                <img src={addFilter} className='administrator-symbol' alt='Filter' />                            
                            </div>
                        </div>
                        <div className='administrator-inner-container'>
                            {/* FIXME: EmployeesView Component goes here */}
                            <TableEmployee 
                                employeeData={employeeData}
                                setEmployeeData={setEmployeeData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/'>Back Home</Link>
        </>
    )
}

export default Administrator