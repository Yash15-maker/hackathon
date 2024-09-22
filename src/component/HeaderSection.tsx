import { Container } from '@mui/material'
import Rocket from "../assets/icons/Rocket.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom';

function HeaderSection() {
    const navigate = useNavigate()
    return (
        <div className='header-bg'>
            <Container maxWidth='lg' className='container-header'>
                <React.Fragment>
                    <div className="header-rocket-section">
                        <div style={{
                            maxHeight: "auto"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "42px"
                            }} >
                                <span style={{
                                    padding: "50px 4px",
                                    background: "yellow",
                                    maxHeight: "17px",
                                    height: "auto"
                                }} id="line-span"></span>
                                <div className='flex-col'>
                                    <span className='accelerate-section'>Accelerate Innovation with Global AI Challenges</span>
                                    <span className='accelerate-section-two'>AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.</span>
                                    <button className='button' onClick={() => navigate('/create')}>Create Challenge</button>
                                </div>
                            </div>
                        </div>
                        <img src={Rocket} alt="rocket.svg" className='photo-rocket' loading='lazy' />
                    </div>
                </React.Fragment>
            </Container>
        </div>

    )
}

export default HeaderSection