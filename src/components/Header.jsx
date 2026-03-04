import './Header.css'

function Header({title}){
    return (
        <div className='container-header'>
            <header>
                <div className='title'>
                    <h1>{title}</h1>
                </div>
                <div className='container-1'>
                    <div className='profile'>

                    </div>
                    <div className='profile'>

                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;