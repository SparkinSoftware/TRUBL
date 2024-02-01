import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../SupabaseContext';

const EmployeeData = ({ id, name, location, role, skill }) => {
    const supabase = useSupabase();
    const [updatedLocation, setUpdatedLocation] = useState(location);
    const [updatedSkill, setUpdatedSkill] = useState(skill);
    const [updatedRole, setUpdatedRole] = useState(role);
    const [editMode, setEditMode] = useState(false)

    const handleLocationChange = (e) => {
        setUpdatedLocation(e.target.value);
    };

    const handleSkillChange = (e) => {
        setUpdatedSkill(e.target.value);
    };

    const handleRoleChange = (e) => {
        setUpdatedRole(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('employee')
                .update({
                    location: updatedLocation,
                    skillset: updatedSkill,
                    role: updatedRole,
                })
                .eq('id', id);

            if (error) {
                console.error('Error updating employee:', error.message);
                return;
            }

            console.log('Update successful for employee ID:', id);
            setEditMode(false)
        } catch (error) {
            console.error('Error updating employee:', error.message);
        }
    }

    const handleDelete = async () => {
        try {
            const { data, error } = await supabase
                .from('employee')
                .delete()
                .eq('id', id);
    
            if (error) {
                console.error('Error deleting employee:', error.message);
                return;
            }
    
            console.log('Delete successful for employee ID:', id);
        } catch (error) {
            console.error('Error deleting employee:', error.message);
        }
    }
    
    return (
        <>
            <tr>
                <td className='name'>{name}</td>

                {/* Location Column */}
                <td className='location'>
                    {editMode ? ( 
                        <select name='location'
                        value={updatedLocation} 
                        onChange={handleLocationChange}
                        >
                            <option value="">Assign City</option>
                            <option value="Austin">Austin, TX</option>
                            <option value="Dallas">Dallas, TX</option>
                            <option value="Houston">Houston, TX</option>
                            <option value="San Antonio">San Antonio, TX</option>
                            <option value="Las Vegas">Las Vegas, NV</option>
                            <option value="Carlsbad">Carlsbad, NM</option>
                        </select> 
                    ) : (
                        location === null ? 'Not Specified' : location
                    )}
                </td>
                
                <td className='role'>
                    {/* Role Column */}
                    { editMode ? (
                        <select
                            name='role'
                            value={updatedRole}
                            onChange={handleRoleChange}
                        >
                            <option value={''}>
                                {role === 1 ? 'Employee' :(role === 2 ? 'Technician' : 'Administrator')}
                            </option>
                            <option value={1}>{'Employee'}</option>
                            <option value={2}>{'Technician'}</option>
                            <option value={3}>{'Administrator'}</option>
                        </select>
                        ) : (
                        role === 1 ? 'Employee' : (role === 2 ? 'Technician' : 'Administrator')

                    )}
                </td>

                <td className='skill'>
                    {/* Skillset column  */}
                    {editMode ? (
                    <select
                        name='skillset'
                        value={updatedSkill}
                        onChange={handleSkillChange}
                    >
                        <option value="">Assign Skill</option>
                        <option value="Admin">Admin</option>
                        <option value="Hardware">Hardware</option>
                        <option value="IT">IT</option>
                        <option value="Security">Security</option>
                        <option value="Software">Software</option>
                    </select>
                    ) : (
                    skill === null ? 'None' : skill
                    )}
                    
                </td>

                <td className='action'>
                    {/* Action buttons */}
                    {editMode ? (
                        <>
                            <button className='actionBtn' onClick={handleSubmit}>Update</button>
                            <button className='actionBtn' onClick={() => setEditMode(false)}>Cancel</button>
                        </>
                        
                    ) : (
                        <>
                            <button className='actionBtn' id='editBtn' onClick={() => setEditMode(true)}>Edit</button>
                            <button className='actionBtn' id='deleteBtn' onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
};

export default EmployeeData;