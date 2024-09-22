import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Card, CardActions, CardContent, CardMedia,
    Button, Typography, Chip, TextField, FormControl,
    Checkbox, FormControlLabel,
    FormGroup, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { SiTicktick } from "react-icons/si";
import { FaAngleDown } from "react-icons/fa6";
import { useHackathon } from '../context/GlobalData';

export default function List() {
    const { hackathons } = useHackathon();
    const [timers, setTimers] = useState<{ [key: number]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        searchTerm: '',
        statusFilter: [] as string[],
        levelFilter: [] as string[]
    });
    const navigate = useNavigate();

    const calculateTimeLeft = (endDate: Date) => {
        const difference = +endDate - +new Date();
        if (difference > 0) {
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return null;
    };

    useEffect(() => {
        setIsLoading(true);
        const interval = setInterval(() => {
            const newTimers = hackathons.reduce((acc, hackathon) => {
                acc[hackathon.id] = calculateTimeLeft(hackathon.status === 'upcoming' ? hackathon.startDate.toString() : hackathon.endDate.toString());
                return acc;
            }, {} as { [key: number]: string });
            setTimers(newTimers);
        }, 1000);

        return () => clearInterval(interval);
    }, [hackathons]);


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return '#FCF1D2';
            case 'active':
                return '#D2E5D4';
            case 'past':
                return '#FFDED4';
            default:
                return '#000000';
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.value;
        setFilters(prev => ({
            ...prev,
            statusFilter: prev.statusFilter.includes(status)
                ? prev.statusFilter.filter(s => s !== status)
                : [...prev.statusFilter, status]
        }));
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const level = e.target.value;
        setFilters(prev => {
            const newLevelFilter = prev.levelFilter.includes(level)
                ? prev.levelFilter.filter(l => l !== level)
                : [...prev.levelFilter, level];
            return { ...prev, levelFilter: newLevelFilter };
        });
    };

    const filteredHackathons = hackathons.filter((hackathon: any) => {
        const matchesSearch = hackathon.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesStatus = filters.statusFilter.length === 0 || filters.statusFilter.includes(hackathon.status);
        const matchesLevel = filters.levelFilter.length === 0 || filters.levelFilter.includes(hackathon.level);
        return matchesSearch && matchesStatus && matchesLevel;
    });

    return (
        <>
            <div className='filter-section' style={{ background: '#002A3B' }}>
                <Container maxWidth='lg' style={{
                    padding: '60px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <Typography variant='h4' component='div' style={{ fontWeight: 'bold', color: 'white' }}>
                        Explore Challenges
                    </Typography>
                    <div className='flex-center-gap'>
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            value={filters.searchTerm}
                            onChange={handleSearchChange}
                            style={{ width: '100%', background: 'white', borderRadius: '12px', height: 'max-content' }}
                        />
                        <div className="filter-dropdowns" style={{ display: 'flex', flexDirection: 'column', height: 'max-content' }}>
                            <Accordion style={{ position: 'relative', width: '100%', zIndex: '20' }}>
                                <AccordionSummary expandIcon={<FaAngleDown />}>
                                    <Typography>Filter</Typography>
                                    <div style={{ padding: '10px 0px' }}>
                                        <hr />
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails style={{ position: 'absolute', background: 'white', width: '173px', borderRadius: '0px 0px 0px 0px', height: 'max-content' }}>

                                    <Typography variant="subtitle1">Status</Typography>
                                    <FormControl component="fieldset" style={{ width: '100%' }}>
                                        <FormGroup>
                                            {['active', 'upcoming', 'past'].map(status => (
                                                <FormControlLabel
                                                    key={status}
                                                    control={
                                                        <Checkbox
                                                            value={status}
                                                            onChange={handleStatusChange}
                                                            checked={filters.statusFilter.includes(status)}
                                                        />
                                                    }
                                                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                                                />
                                            ))}
                                        </FormGroup>
                                        <div style={{ padding: '10px 0px' }}>
                                            <hr />
                                        </div>
                                    </FormControl>

                                    <Typography variant="subtitle1" gutterBottom>
                                        Level
                                    </Typography>
                                    <FormControl component="fieldset" style={{ width: '100%' }}>
                                        <FormGroup>
                                            {['easy', 'medium', 'hard'].map(level => (
                                                <FormControlLabel
                                                    key={level}
                                                    control={
                                                        <Checkbox
                                                            value={level}
                                                            onChange={handleLevelChange}
                                                            checked={filters.levelFilter.includes(level)}
                                                        />
                                                    }
                                                    label={level.charAt(0).toUpperCase() + level.slice(1)}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </div>
            <div style={{
                background: '#003145',
                padding: '40px 0'
            }}>
                <Container maxWidth='lg'>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {filteredHackathons.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                {/* You can replace the spinner or add a conditional for loading */}
                                {isLoading ? (
                                    <div className='spinner-absolute'><span className="loader"></span></div>
                                ) : (
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        No Data Available
                                    </Typography>
                                )}
                            </div>
                        ) : (
                            filteredHackathons.map((hackathon: any) => (
                                <Card key={hackathon.id} sx={{
                                    maxWidth: 300,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    margin: 'auto',
                                    borderRadius: '12px'
                                }}>
                                    <CardMedia
                                        component="img"
                                        alt={hackathon.name}
                                        height="180"
                                        image={hackathon.image}
                                        style={{
                                            borderTopLeftRadius: '8px',
                                            borderTopRightRadius: '8px',
                                        }}
                                    />
                                    <CardContent style={{
                                        padding: '26px 26px 0px 26px',
                                        textAlign: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div className='flex-center'>
                                            <Chip
                                                label={hackathon.status}
                                                style={{
                                                    backgroundColor: getStatusColor(hackathon.status),
                                                    textTransform: 'capitalize',
                                                    color: 'gray',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                    padding: '4px 8px',
                                                }}
                                            />
                                        </div>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: '1.2rem',
                                                marginTop: '10px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {hackathon.name}
                                        </Typography>

                                        {hackathon.status !== 'past' ? (
                                            <>
                                                <Typography variant="body2" color="textSecondary" style={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem'
                                                }}>
                                                    {hackathon.status === 'upcoming' ? 'Starts in:' : 'Ends in:'}
                                                </Typography>
                                                <Typography variant="h6" style={{
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    marginTop: '10px'
                                                }}>
                                                    {timers[hackathon.id] || '00:00:00'}
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="body2" color="textSecondary" style={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem'
                                                }}>
                                                    Ended on:
                                                </Typography>
                                                <Typography variant="h6" style={{
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    marginTop: '10px'
                                                }}>
                                                    {new Date(hackathon.endTime).toLocaleString()}
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                    <CardActions style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '30px'
                                    }}>
                                        <Button
                                            size="medium"
                                            style={{
                                                backgroundColor: hackathon.status === 'past' ? '#FFDED4' : '#44924C',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                borderRadius: '8px',
                                                width: '100%',
                                                padding: '12px'
                                            }}
                                            onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                                        >
                                            {hackathon.status === 'past' ? 'View Details' : 'Participate Now'}
                                            <SiTicktick style={{ marginLeft: '5px' }} />
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        )}
                    </div>
                </Container>

            </div>
        </>
    );
}
