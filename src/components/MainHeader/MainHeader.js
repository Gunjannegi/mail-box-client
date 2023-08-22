import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
    return (
        <Navbar expand='lg'>
            <Container>
                <div>
                    <span>
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </span>
                    <span>
                        < NavLink to='/login'>Login</NavLink>
                       
                    </span>
                </div>
            </Container>
        </Navbar>
    )

};
export default MainHeader;