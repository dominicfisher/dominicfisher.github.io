import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [ticketsDropdownVisible, setTicketsDropdownVisible] = useState(false);
    const [grindersDropdownVisible, setGrindersDropdownVisible] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleProfileDropdownToggle = () => {
        setProfileDropdownVisible(!profileDropdownVisible);
    };

    const handleTicketsDropdownToggle = () => {
        setTicketsDropdownVisible(!ticketsDropdownVisible);
    };
    
    const handleGrindersDropdownToggle = () => {
        setGrindersDropdownVisible(!grindersDropdownVisible);
    };

    return (
        <aside className="sidebar">
        <nav className="nav-links">
            <div id="logo">
                <img src="/logo.png" alt="Company Logo" className="image"/>
            </div>
            <div>
                <Link className="sidebar-button active" to="/"><i className='bx bx-home-alt-2'></i> Home</Link>
                <div className="dropdown">
                    <Link className="Slink" to="#" onClick={handleGrindersDropdownToggle}>
                        <i className='bx bx-store-alt'></i> Grinders {grindersDropdownVisible ? '▲' : '▼'}
                    </Link>
                    <div className={`dropdown-container ${grindersDropdownVisible ? 'show' : ''}`}>
                        <div className="dropdown-content">
                            <Link className="dropdown-item" to="/grinders/c"><i className='bx bx-plus'></i> Open Orders</Link>
                            <Link className="dropdown-item" to="/grinders/collection"><i className='bx bx-collection'></i> Awaiting Collection</Link>
                            <Link className="dropdown-item" to="/grinders/OrderList"><i className='bx bx-notepad'></i> Current</Link>
                            <Link className="dropdown-item" to="/grinders/history"><i className='bx bx-collection'></i> Past</Link>
                        </div>
                    </div>
                </div>
                
                <div className="dropdown">
                    <Link className="Slink" to="#" onClick={handleDropdownToggle}>
                        <i className='bx bx-store-alt'></i> Orders {dropdownVisible ? '▲' : '▼'}
                    </Link>
                    <div className={`dropdown-container ${dropdownVisible ? 'show' : ''}`}>
                        <div className="dropdown-content">
                            <Link className="dropdown-item" to="/order/c"><i className='bx bx-plus'></i> Create</Link>
                            <Link className="dropdown-item" to="/order/OrderList"><i className='bx bx-notepad'></i> Current</Link>
                            <Link className="dropdown-item" to="/order/history"><i className='bx bx-collection'></i> Past</Link>
                        </div>
                    </div>
                </div>
                
                <div className="dropdown">
                    <Link className="Slink" to="#" onClick={handleTicketsDropdownToggle}>
                        <i className='bx bx-support'></i> Tickets {ticketsDropdownVisible ? '▲' : '▼'}
                    </Link>
                    <div className={`dropdown-container ${ticketsDropdownVisible ? 'show' : ''}`}>
                        <div className="dropdown-content">
                            <Link className="dropdown-item" to="/staff/c"><i className='bx bx-plus'></i> Create</Link>
                            <Link className="dropdown-item" to="/staff/history"><i className='bx bx-collection'></i> Past</Link>
                        </div>
                    </div>
                </div>
                <Link className="Slink" to="/faction"><i className='bx bxs-factory'></i> Faction</Link>
                <hr />
          
                
            </div>
        </nav>
        <ul className="icons2">
            <li><a href="https://twitter.com/fisher_dominic" target="_blank" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="https://www.facebook.com/dominic.fisher.54" target="_blank" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
            <li><a href="mailto:dominic.fisher@hotmail.com" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
        </ul>
    </aside>
    );
};

export default Sidebar;