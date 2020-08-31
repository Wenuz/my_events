import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEvents, filterEvents } from "../../_actions/events_actions";
import infos from "../../images/infos.png";

    function EventsShow() {
        const dispatch = useDispatch();
        const events = useSelector((state) => state.events);

        useEffect(() => {
            getEvents().then((data) => dispatch(data));
        }, [dispatch]);


        return (
            <div className="articles-container">
                <div className="big-square"></div>
                <h1 className="tk-ivymode"> - The events </h1>
                <div className="articles">
                {events.list?.events.event.map(events => (
                    <div key={events.id} className="article-selector" >
                        <div className="square" >
                            <Link to={`/event/${events.id}`}><img className="infos" src={infos} alt="more infos" /></Link>
                                <div className="lilsquare">
                                 <h5 className="text-title" >
                                    {events.title}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        );
    }
/*        const [details, setDetails] = useState(null);

        const getUserGeolocationDetails = () => {
            fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
                .then(response => response.json())
                .then(data => setDetails(data));
        }*/
export default EventsShow;
