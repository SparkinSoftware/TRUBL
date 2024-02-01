import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import addSymbol from '../assets/symbol_add.svg'
import addFilter from '../assets/symbol_filter.svg'
import './administrator.css'
import TableEmployee from './TableEmployee'
import { useSupabase } from '../../SupabaseContext'
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';

const Administrator =({}) => {
    const { isNightMode } = useNightMode();
    const supabase = useSupabase();
    const [ employeeData, setEmployeeData ] = useState([]);
    const [currentUser, setCurrentUser] = useState('Guest')
    supabase.auth.getUser().then(user => {
        setCurrentUser(user.data.user.user_metadata.display_name)
    })
    useEffect(() => {
        const fetchEmployeeData = async () => {
            const { data, error } = await supabase
            .from('employee')
            .select('*');

            if (error) {
                console.error('Error fetching employee data:', error.message);
            } else {
                setEmployeeData(data);
            }
        };

        fetchEmployeeData();
    }, [supabase]);


    return (
        <>
            <div className='administrator-container'>
                <div className={'administrator-employees-view' + (isNightMode ? '-nm' : '')}>
                    <div className={'administrator-title' + (isNightMode ? '-nm' : '')}>{`Administrator Portal`}</div>
                    <div className={'administrator-outer-container' + (isNightMode ? '-nm' : '')}>
                        <div className={'administrator-menu-container' + (isNightMode ? '-nm' : '')}>
                            <div className={'administrator-employee-form' + (isNightMode ? '-nm' : '')}>
                                <img src={addSymbol} className='administrator-symbol' alt='Add' />                            
                            </div>
                            <div className={'administrator-employee-filter' + (isNightMode ? '-nm' : '')}>
                                <img src={addFilter} className='administrator-symbol' alt='Filter' />                            
                            </div>
                        </div>
                        <div className={'administrator-inner-container' + (isNightMode ? '-nm' : '')}>
                            {/* FIXME: EmployeesView Component goes here */}
                            <TableEmployee 
                                employeeData={employeeData}
                                setEmployeeData={setEmployeeData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="linkContainer">
                <Link to='/landing'>Back</Link>
                <br/>
                <Link to='/'>Logout</Link>
            </div>
        </>
    )
}

export default Administrator