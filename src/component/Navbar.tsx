import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const styleFlex = {
        display: "flex",
        gap: "1px",
        width: "fit-content"
    }
    const navigate = useNavigate()
    return (
        <Container maxWidth='lg'>
            <nav className='navPadding'>
                <div style={styleFlex}>
                    <img src="vite.svg" onClick={() => navigate("/")} style={{
                        cursor: 'pointer'
                    }} />
                    <span style={{
                        color: "black",
                        fontSize: 20,
                        margin: "auto"
                    }}>Dhpi</span>
                </div>
            </nav>
        </Container>
    )
}
