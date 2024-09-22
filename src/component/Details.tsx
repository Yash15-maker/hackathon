import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useHackathon } from '../context/GlobalData';
import { Container, Paper, Typography, Chip, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CiClock2 } from "react-icons/ci";
import React from 'react';
import signal from "../assets/icons/carbon_skill-level-basic.svg";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    color: 'white',
}));

const StatusChip = styled(Chip)(({ status }) => ({
    backgroundColor:
        status === 'active' ? '#4caf50' :
            status === 'upcoming' ? '#ff9800' : '#e0e0e0',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '16px',
}));

const HackathonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Add navigate hook
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const { hackathons, setEditingHackathon } = useHackathon();
    const hackathon = hackathons.find(h => h.id === Number(id));

    if (!hackathon) {
        return (
            <Container maxWidth="lg">
                <Typography variant="h5" align="center" style={{ marginTop: '2rem', color: 'white' }}>
                    No data available for this hackathon.
                </Typography>
            </Container>
        );
    }

    const getStatusAndDate = () => {
        const now = new Date();
        if (now < hackathon.startDate) {
            return {
                status: 'upcoming',
                date: hackathon.startDate,
                label: 'Starts on',
            };
        }
        if (now > hackathon.endDate) {
            return {
                status: 'past',
                date: hackathon.endDate,
                label: 'Ended on',
            };
        }
        return {
            status: 'active',
            date: hackathon.endDate,
            label: 'Ends on',
        };
    };

    const { status, date, label } = getStatusAndDate();

    const formatDate = (date: Date) => {
        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <>
            <div className="hackathon-details">
                <Container maxWidth="lg">
                    <StyledPaper elevation={3} style={{ background: 'transparent', boxShadow: 'none' }}>
                        <StatusChip
                            label={`${status.toUpperCase()} - ${label} ${formatDate(date)}`}
                            status={status}
                            icon={<CiClock2 style={{ fontSize: '20px' }} />}
                        />
                        <Typography variant="h4" gutterBottom>
                            {hackathon.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Identify the class to which each butterfly belongs to
                        </Typography>
                        <Box mt={2} sx={{ display: 'flex', gap: '10px' }}>
                            <img
                                src={signal}
                                style={{
                                    height: '25px',
                                    width: '67px',
                                    background: 'white',
                                }}
                            />
                            <Typography variant="body1">
                                <strong style={{
                                    textTransform: 'capitalize',
                                    color: 'white',
                                    margin: 'auto'
                                }}>
                                    {hackathon.level}
                                </strong>
                            </Typography>
                        </Box>
                    </StyledPaper>
                </Container>
            </div>

            <div style={{
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}>
                <Container maxWidth="lg" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '15px 0px 0px 0px',
                }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" {...a11yProps(0)} />
                    </Tabs>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: '10px',
                        padding: '7px 0px',
                    }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => {
                                setEditingHackathon(hackathon);
                                navigate(`/create/${hackathon.id}`);
                            }}
                        >
                            Edit
                        </Button>
                        <Button variant="outlined" color="error" size="small">
                            Delete
                        </Button>
                    </div>
                </Container>
            </div>

            <Container maxWidth="lg">
                <Typography variant="body1" mt={2}>
                    <p style={{ fontSize: '1.2rem', padding: '20px 0px', color: '#374151' }}>
                        {hackathon.description || 'No description available.'}
                    </p>
                </Typography>
            </Container>
        </>
    );
};

export default HackathonDetails;
