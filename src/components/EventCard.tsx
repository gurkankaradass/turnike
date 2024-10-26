import { EventType } from '../types/Types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface EventCardProps {
    event: EventType
}

function EventCard(props: EventCardProps) {
    const { name, image, category } = props.event;
    return (
        <div style={{ maxWidth: "500px" }}>
            {/* {
                category === "cinema" ? <img src={image} alt="" width={155} /> : <img src={image} alt="" width={545} />
            }
            {name}
            {details}
            {
                map && <iframe src={map}></iframe>
            }
            {
                visit && visit
            } */}
            <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 350, margin: "15px", cursor: "pointer", borderRadius: "10px" }}>
                {
                    category === "cinema" ? <img src={image} alt="" width={160} height={200} /> : <img src={image} alt="" width={350} height={200} />
                }
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "35px" }}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h6" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </div >


    )
}

export default EventCard