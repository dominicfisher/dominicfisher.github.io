import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import SpotifyPlayer from './SpotifyPlayer';

const Sidebar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [ticketsDropdownVisible, setTicketsDropdownVisible] = useState(false);
    const [grindersDropdownVisible, setGrindersDropdownVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);  // Sidebar is open by default

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

 

    const handleTicketsDropdownToggle = () => {
        setTicketsDropdownVisible(!ticketsDropdownVisible);
    };

    const handleGrindersDropdownToggle = () => {
        setGrindersDropdownVisible(!grindersDropdownVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {!sidebarOpen && <button className="open-btn" onClick={() => setSidebarOpen(true)}>Open Sidebar</button>}
            <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
                <nav className="nav-links">
                    <div id="logo">
                        <img src="/logo.png" alt="Company Logo" className="image" />
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
                        <SpotifyPlayer />
                    </div>
                </nav>
                <ul className="icons2">
                    <li><a href="https://twitter.com/fisher_dominic" target="_blank" className="icon brands fa-twitter"><span className="label"><i class='bx bxl-twitter' rel="noreferrer"></i></span></a></li>
                    <li><a href="https://www.facebook.com/dominic.fisher.54" target="_blank" className="icon brands fa-facebook-f"><span className="label"><i class='bx bxl-facebook' rel="noreferrer"></i></span></a></li>
                    <li><a href="mailto:dominic.fisher@hotmail.com" className="icon solid fa-envelope"><span className="label"><i classNames='bx bx-envelope' rel="noreferrer"></i></span></a></li>
                </ul>
            </aside>
            {sidebarOpen && <button className="close-btn" onClick={() => setSidebarOpen(false)}><i className='bx bx-menu' ></i></button>}
        </>
    );
};

export default Sidebar;