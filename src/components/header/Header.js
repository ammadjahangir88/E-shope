import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from "./Header.module.scss"
import { auth } from '../../firebase/config';
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/AuthSlice';

import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/HiddenLink'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/CartSlice';

const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>

    </div>
)


const activeLink = ({ isActive }) =>
    (isActive ? `${styles.active}` : "")

const Header = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [scrollPage, setScrollPage] = useState(false)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Cart
                <FaShoppingCart size={20} />
                <p>{cartTotalQuantity}</p>
            </Link>
        </span>

    )
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const hideMenu = () => {
        setShowMenu(false)
    }
    // Monitor Currently Signed In user
    const dispatch = useDispatch()


    const fixNavbar = () => {
        if (window.scrollY > 50) {
            setScrollPage(true)
        }
        else {
            setScrollPage(false)
        }

    }
    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch]);
    window.addEventListener("scroll", fixNavbar)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"))
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    console.log(u1)
                    setDisplayName(uName)

                }
                else {
                    setDisplayName(user.displayName)
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }))
                // ...
            } else {
                // User is signed out
                setDisplayName("")
                dispatch(REMOVE_ACTIVE_USER())
                // ...
            }
        });

    }, [dispatch, displayName])
    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout Successfully.")
            navigate("/contact")
        }).catch((error) => {
            // An error happened.
            toast.error("error.message")
        });
    }
    return (
        <header className={scrollPage ? `${styles.fixed}` : null}>
            <div className={styles.header}>
                {logo}

                <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
                    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles['show-nav-wrapper']}`
                        : `${styles["nav-wrapper"]}`} onClick={hideMenu}>


                    </div>
                    <ul onClick={hideMenu}>
                        <li className={styles["logo-mobile"]}>
                            {logo}
                            <FaTimes size={22} color="#fff" onClick={hideMenu} />
                        </li>
                        <li>
                            <AdminOnlyLink>
                                <Link to="/admin/home">
                                    <button className="--btn --btn-primary">Admin</button>
                                </Link>
                            </AdminOnlyLink>
                        </li>
                        <li>
                            <NavLink to='/home' className={activeLink}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className={activeLink}>Contact Us</NavLink>
                        </li>

                    </ul>
                    <div className={styles["header-right"]} onClick={hideMenu}  >
                        <span className={styles.links}>
                            <ShowOnLogout>
                                <NavLink to='/login' className={activeLink}>Login</NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <a href='#' style={{ color: "#ff7722" }}>
                                    <FaUserCircle size={16} />
                                    Hi, {displayName}

                                </a>
                            </ShowOnLogin>
                            <ShowOnLogout>
                                <NavLink to='/register' className={activeLink}>Register</NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <NavLink to='/order-history' className={activeLink}>My Orders</NavLink>

                                <NavLink to='/' className={activeLink} onClick={logoutUser}>Log Out</NavLink>
                            </ShowOnLogin>
                        </span>

                        {cart}


                    </div>

                </nav>



                <div className={styles['menu-icon']}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />


                </div>
            </div>
        </header>
    )
}

export default Header