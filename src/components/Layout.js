import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="App py-5">
                <Outlet />
            </main>
        </>
    )
}

export default Layout