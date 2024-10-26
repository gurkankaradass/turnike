import { Container } from '@mui/material';
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
        <div>
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
            <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 200, margin: "15px", cursor: "pointer", borderRadius: "10px" }}>
                {/* {
                    category === "cinema" ? <img src={image} alt="" width={160} height={200} /> : <img src={image} alt="" width={350} height={200} />
                }
                {
                    category === "cinema" ?
                        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", width: "128px", height: "20px", backgroundColor: "rgb(225, 225, 255)" }}>
                            <Typography sx={{ fontWeight: "bolder", fontSize: "14px", textAlign: "center" }} variant="subtitle1" component="div">
                                {name}
                            </Typography>
                        </CardContent> :
                        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "20px", backgroundColor: "lightgray" }}>
                            <Typography sx={{ fontWeight: "bold", textAlign: "center" }} variant="h6" component="div">
                                {name}
                            </Typography>
                        </CardContent>
                } */}
                <img src={image} alt="" width={200} height={266} />
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "35px", backgroundColor: "rgb(225, 225, 255)" }}>
                    <Typography sx={{ fontWeight: "bolder", fontSize: "15px", textAlign: "center" }} variant="body2" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </div >


    )
}

export default EventCard