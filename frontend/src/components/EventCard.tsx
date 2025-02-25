import { EventType } from '../types/Types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../css/Events.css"
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
    event: EventType
}

function EventCard(props: EventCardProps) {
    const { id, name, image } = props.event;
    const navigate = useNavigate();
    return (
        <div className='main-div'>
            <Card onClick={() => {
                navigate("/event-detail/" + id)
                window.location.reload();
            }} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 200, margin: "15px", cursor: "pointer", borderRadius: "10px" }}>
                <img src={image} alt="" width={200} height={266} />
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "35px", backgroundColor: "white" }}>
                    <Typography sx={{ fontWeight: "bolder", fontSize: "15px", textAlign: "center" }} variant="body2" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </div >


    )
}

export default EventCard