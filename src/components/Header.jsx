import Profile from '../assets/profile.png';
import Notif from '../assets/notif.png';

function Header({title}){
    return (
        <div className='container-header'>
            <header>
                <div className='title'>
                    <h1>{title}</h1>
                </div>
                <div className='container-1'>
                    <div className='profile'>
                        <img src={Notif} alt="notif" style={{opacity: '0.7'}}/>
                    </div>
                    <div className='profile'>
                        <img src={Profile} alt="profile" />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;