import React, { useState } from 'react';
import { Container, Checkbox, FormControlLabel, Chip, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, FormGroup } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";

export default function FilterComponent() {
    const [filters, setFilters] = useState({
        searchTerm: '',
        statusFilter: [] as string[],
        levelFilter: [] as string[]
    });

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
        setFilters(prev => ({
            ...prev,
            levelFilter: prev.levelFilter.includes(level)
                ? prev.levelFilter.filter(l => l !== level)
                : [...prev.levelFilter, level]
        }));
    };

    const removeStatusFilter = (status: string) => {
        setFilters(prev => ({
            ...prev,
            statusFilter: prev.statusFilter.filter(s => s !== status)
        }));
    };

    const removeLevelFilter = (level: string) => {
        setFilters(prev => ({
            ...prev,
            levelFilter: prev.levelFilter.filter(l => l !== level)
        }));
    };

    return (
        <Container maxWidth='lg' style={{ padding: '60px 0px' }}>
            <Typography variant='h4' component='div' style={{ fontWeight: 'bold' }}>
                Explore Challenges
            </Typography>

            {/* Search Input */}
            <TextField
                variant="outlined"
                placeholder="Search"
                value={filters.searchTerm}
                onChange={handleSearchChange}
                style={{ width: '100%', marginTop: '20px', borderRadius: '12px' }}
            />

            {/* Filter Accordion */}
            <Accordion style={{ marginTop: '20px' }}>
                <AccordionSummary expandIcon={<FaAngleDown />}>
                    <Typography>Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="subtitle1">Status</Typography>
                    <FormControl component="fieldset">
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
                    </FormControl>

                    <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Level</Typography>
                    <FormControl component="fieldset">
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

            {/* Selected Filters */}
            <div style={{ marginTop: '20px', background: 'white' }}>
                {filters.statusFilter.map(status => (
                    <Chip
                        key={status}
                        label={status.charAt(0).toUpperCase() + status.slice(1)}
                        onDelete={() => removeStatusFilter(status)}
                        style={{ marginRight: '10px', marginBottom: '10px' }}
                    />
                ))}
                {filters.levelFilter.map(level => (
                    <Chip
                        key={level}
                        label={level.charAt(0).toUpperCase() + level.slice(1)}
                        onDelete={() => removeLevelFilter(level)}
                        style={{ marginRight: '10px', marginBottom: '10px' }}
                    />
                ))}
            </div>
        </Container>
    );
}
