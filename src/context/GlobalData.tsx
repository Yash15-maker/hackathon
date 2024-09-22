import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Hackathon {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    level: 'easy' | 'medium' | 'hard';
    status: 'upcoming' | 'active' | 'past';
    description?: string;
    image?: string;
}

interface HackathonContextType {
    hackathons: Hackathon[];
    editingHackathon: Hackathon | null;
    setSortOrder: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
    setFilterLevel: React.Dispatch<React.SetStateAction<'all' | 'easy' | 'medium' | 'hard'>>;
    setFilterStatus: React.Dispatch<React.SetStateAction<'all' | 'upcoming' | 'active' | 'past'>>;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    hackathonData: Omit<Hackathon, 'id' | 'status'>;
    setHackathonName: (name: string) => void;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setDescription: (description: string) => void;
    setImage: (file: File | null) => void;
    setLevel: (level: 'easy' | 'medium' | 'hard') => void;
    setEditingHackathon: (hackathon: Hackathon | null) => void;
    createHackathon: () => void;
    updateHackathon: (id: number) => void;
    fetchHackathonById: (id: number) => Hackathon | undefined;
}

const HackathonContext = createContext<HackathonContextType | null>(null);

export const HackathonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [filterLevel, setFilterLevel] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'active' | 'past'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [hackathonData, setHackathonData] = useState<Omit<Hackathon, 'id' | 'status'>>({
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        level: 'easy',
        description: '',
        image: undefined,
    });

    const updateHackathonStatus = (hackathon: Hackathon): Hackathon => {
        const today = new Date();
        if (today < hackathon.startDate) {
            return { ...hackathon, status: 'upcoming' };
        } else if (today >= hackathon.startDate && today <= hackathon.endDate) {
            return { ...hackathon, status: 'active' };
        } else {
            return { ...hackathon, status: 'past' };
        }
    };

    useEffect(() => {
        const storedHackathons = localStorage.getItem('hackathons');
        if (storedHackathons) {
            const parsedHackathons = JSON.parse(storedHackathons, (key, value) => {
                if (key === 'startDate' || key === 'endDate') {
                    return new Date(value);
                }
                return value;
            });
            const updatedHackathons = parsedHackathons.map(updateHackathonStatus);
            setHackathons(updatedHackathons);
            localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
        }
    }, []);

    const setHackathonName = (name: string) => {
        setHackathonData(prev => ({ ...prev, name }));
    };

    const setStartDate = (date: string) => {
        setHackathonData(prev => ({ ...prev, startDate: new Date(date) }));
    };

    const setEndDate = (date: string) => {
        setHackathonData(prev => ({ ...prev, endDate: new Date(date) }));
    };

    const setDescription = (description: string) => {
        setHackathonData(prev => ({ ...prev, description }));
    };

    const setImage = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHackathonData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            setHackathonData(prev => ({ ...prev, image: undefined }));
        }
    };

    const setLevel = (level: 'easy' | 'medium' | 'hard') => {
        setHackathonData(prev => ({ ...prev, level }));
    };

    const createHackathon = () => {
        if (editingHackathon) {
            const updatedHackathons = hackathons.map(hackathon =>
                hackathon.id === editingHackathon.id ? { ...hackathon, ...hackathonData } : hackathon
            );
            setHackathons(updatedHackathons.map(updateHackathonStatus));
            localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
            setEditingHackathon(null);
        } else {
            const newHackathon: Hackathon = {
                ...hackathonData,
                id: hackathons.length + 1,
                status: 'upcoming',
            };
            const updatedHackathons = [...hackathons, newHackathon].map(updateHackathonStatus);
            setHackathons(updatedHackathons);
            localStorage.setItem('hackathons', JSON.stringify(updatedHackathons, (key, value) => {
                if (value instanceof Date) {
                    return value.toISOString();
                }
                return value;
            }));
        }
        resetHackathonData();
    };

    const resetHackathonData = () => {
        setHackathonData({
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            level: 'easy',
            description: '',
            image: undefined,
        });
    };


    const updateHackathon = (id: number) => {
        const hackathonToUpdate = hackathons.find(h => h.id === id);
        if (hackathonToUpdate) {
            setEditingHackathon(hackathonToUpdate);
            setHackathonData({
                name: hackathonToUpdate.name,
                startDate: hackathonToUpdate.startDate,
                endDate: hackathonToUpdate.endDate,
                level: hackathonToUpdate.level,
                description: hackathonToUpdate.description || '',
                image: hackathonToUpdate.image,
            });
        }
    };

    const fetchHackathonById = (id: number): Hackathon | undefined => {
        return hackathons.find(hackathon => hackathon.id === id);
    };

    return (
        <HackathonContext.Provider value={{
            hackathons,
            editingHackathon,
            setSortOrder,
            setFilterLevel,
            setFilterStatus,
            setSearchTerm,
            hackathonData,
            setHackathonName,
            setStartDate,
            setEndDate,
            setDescription,
            setImage,
            setLevel,
            setEditingHackathon,
            createHackathon,
            updateHackathon,
            fetchHackathonById,
        }}>
            {children}
        </HackathonContext.Provider>
    );
};

export const useHackathon = (): HackathonContextType => {
    const context = useContext(HackathonContext);
    if (context === null) {
        throw new Error('useHackathon must be used within a HackathonProvider');
    }
    return context;
};
