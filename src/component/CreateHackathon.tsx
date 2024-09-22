import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHackathon } from '../context/GlobalData';
import { useNavigate, useParams } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// interface Hackathon {
//     name: string;
//     startDate: Date;
//     endDate: Date;
//     description?: string;
//     image: string;
//     level: 'easy' | 'medium' | 'hard';
// }

function CreateHackathon() {
    const {
        hackathonData,
        setHackathonName,
        setStartDate,
        setEndDate,
        setDescription,
        setImage,
        setLevel,
        createHackathon,
        updateHackathon,
        fetchHackathonById,
    } = useHackathon();

    const { id } = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState<string>('');

    useEffect(() => {
        if (id) {
            const hackathon = fetchHackathonById(Number(id));
            if (hackathon) {
                setHackathonName(hackathon.name);
                setStartDate(hackathon.startDate.toISOString());
                setEndDate(hackathon.endDate.toISOString());
                setDescription(hackathon.description || '');
                setImage(hackathon.image ? new File([], hackathon.image) : null);
                setLevel(hackathon.level);
            }
        }
    }, [fetchHackathonById, id, setHackathonName, setStartDate, setEndDate, setDescription, setImage, setLevel]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateHackathon(Number(id));
        } else {
            createHackathon();
        }
        setTimeout(() => {
            navigate('/');
        }, 100);
    };

    return (
        <div style={{
            scrollBehavior: 'auto', height: '100%', padding: '0px 0px 25px 0px'
        }}>
            <Box sx={{ bgcolor: '#F8F9FD', py: 2, mb: 3 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h1" style={{
                        fontSize: "2rem",
                        fontWeight: 500,
                        padding: '15px 0px'
                    }}>
                        {id ? 'Edit Challenge' : 'Challenge Details'}
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="lg">
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }} onSubmit={handleSubmit}>
                    <div className='flex-col-form'>
                        <label>Challenge Name</label>
                        <TextField
                            value={hackathonData?.name || ''}
                            onChange={(e) => setHackathonName(e.target.value)}
                        />
                    </div>
                    <div className='flex-col-form'>
                        <label>Start Date</label>
                        <input
                            type='datetime-local'
                            className='date-class'
                            placeholder='Add Start Date and Time'
                            value={hackathonData?.startDate?.toISOString().slice(0, 16) || ''}
                            onChange={(e) => setStartDate(new Date(e.target.value).toString())}
                        />
                    </div>
                    <div className='flex-col-form'>
                        <label>End Date</label>
                        <input
                            type='datetime-local'
                            className='date-class'
                            placeholder='Add End Date and Time'
                            value={hackathonData?.endDate?.toISOString().slice(0, 16) || ''}
                            onChange={(e) => setEndDate(new Date(e.target.value).toString())}
                        />
                    </div>
                    <div className='flex-col-form'>
                        <label>Description</label>
                        <textarea
                            minLength={5}
                            style={{
                                maxWidth: "100%"
                            }}
                            value={hackathonData?.description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex-col-form'>
                        <label>Image</label>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            endIcon={<FaCloudUploadAlt />}
                            style={{
                                padding: "20px 25px",
                                width: "fit-content",
                                background: '#F4F4F4',
                                color: '#666666'
                            }}
                        >
                            Upload
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Hackathon preview"
                                style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                    <div className='flex-col-form'>
                        <label>Level Type</label>
                        <Select
                            value={hackathonData?.level || ''}
                            label="Level"
                            onChange={(e) => setLevel(e.target.value as 'easy' | 'medium' | 'hard')}
                            style={{
                                width: '20%'
                            }}
                        >
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                        </Select>
                    </div>
                    <Button type="submit" variant="contained" color="success" style={{ width: 'fit-content' }}>
                        {id ? 'Update Challenge' : 'Create Challenge'}
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default CreateHackathon;
