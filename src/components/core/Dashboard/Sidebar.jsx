import React from 'react';
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from "../../../services/operations/authApi";
import SidebarLink from './SidebarLink';
// import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className='loader'>
                Loading...
            </div>
        )
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Logout logic
                dispatch(logout(navigate));
            }
        });
    };

    return (
        <div className='text-white'>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc[100vh-3.5rem)] bg-richblack-800 py-10'>

                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
                <div className='flex flex-col'>
                    <SidebarLink
                        link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    <button id="logout-button" onClick={handleLogout}>
                        <div id="logout-container">
                            <VscSignOut id="logout-icon" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} */}
        </div>
    )
}

export default Sidebar
