import { Container } from '@mui/material';
import notebook from "../assets/icons/carbon_notebook-reference.svg"
import Vector from "../assets/icons/Vector.svg"
import Robot from "../assets/icons/Vector.svg"
import IdentificationCard from "../assets/icons/IdentificationCard.svg"

export default function GridAI() {
    const cardData = [
        {
            icon: notebook,
            title: "Prove your skills",
            description: "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
        },
        {
            icon: Vector,
            title: "Learn from community",
            description: "One can look and analyze the solutions submitted by other Data Scientists in the community and learn from them.",
        },
        {
            icon: Robot,
            title: "Challenge yourself",
            description: "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
        },
        {
            icon: IdentificationCard,
            title: "Earn recognition",
            description: "You will stand out from the crowd if you do well in AI challenges; it not only helps you shine in the community but also earns rewards.",
        }
    ];

    return (
        <div style={{
            background: 'white'
        }}>
            <Container maxWidth='lg' style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '50px',
                    fontSize: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    Why Participate in <span style={{
                        color: '#44924C',
                        fontWeight: 'bold'
                    }}>AI Challenges?</span>
                </div>
                <div className="card-grid">
                    {cardData.map((card, index) => (
                        <div className="card" key={index}>
                            <img src={card.icon} alt="card-img" className="icon" />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
