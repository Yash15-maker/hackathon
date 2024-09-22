import { Container, Box, Typography } from '@mui/material';
import contact from "../assets/icons/contact.svg"

export default function Stats() {
    const statsArray = [
        { value: "100K+", label: "AI model submissions" },
        { value: "50K+", label: "Data Scientists" },
        { value: "100+", label: "AI Challenges hosted" }
    ];

    return (
        <div style={{ background: "#002A3B", padding: '40px 0' }}>
            <Container maxWidth="lg" className='flex-row'>
                {statsArray.map((stat, index) => (
                    <Box key={index} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        gap: '18px',

                    }}>
                        <img src={contact} style={{
                            height: "75px",
                            margin: "auto",
                            color: '#002A3B'
                        }} loading='lazy' />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                                color: 'white',
                                padding: '10px 0px',
                                alignContent: 'center',
                                margin: '0px 60px 0px 0px'
                                // textAlign: "center",
                            }}
                        >
                            <Typography variant="h4" component="div" style={{
                                fontWeight: "bold"
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography variant="body1" component="div">
                                {stat.label}
                            </Typography>
                        </Box>
                        {index !== statsArray.length - 1 && <div style={{
                            margin: "auto",
                            maxHeight: "40px",
                        }} className='line-second-header'><span style={{
                            padding: "0px 2px 0px 0px",
                            background: "white",
                            maxHeight: "30px"
                        }}></span></div>}
                    </Box>
                ))}
            </Container>
        </div>
    )
}
