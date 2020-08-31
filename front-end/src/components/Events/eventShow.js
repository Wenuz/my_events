import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, filterEvents } from "../../_actions/events_actions";
import infos from "../../images/infos.png";

    function EventsShow() {
        const dispatch = useDispatch();
        const events = useSelector((state) => state.events);

        useEffect(() => {
            getEvents().then((data) => dispatch(data));
        }, [dispatch]);

        const [details, setDetails] = useState(null);

        const getUserGeolocationDetails = () => {
            fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
                .then(response => response.json())
                .then(data => setDetails(data));
        }


        /*const searchArticle = (name) => {
            filterEvents(name).then(data => dispatch(data))
        }*/
        return (
            <div className="articles-container">
                    <button onClick={getUserGeolocationDetails}>Evenement près de chez moi</button>
                {details && <ul>

                            <li>
                                Location : {`${details.city},${details.country_name}`}
                            </li>
                            <li>
                               IP : {details.IPv4}
                               }
                            </li>
                        </ul>

                    }
                <h1 className="tk-ivymode"> - The events</h1>
                <div className="articles">
                {events.list?.events.event.map(events => (
                    <div className="article-selector">
                        <div className="square">
                            <img className="infos" src={infos} alt="more infos" />
                            <div className="lilsquare">
                                <h5 className="text-title">
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

export default EventsShow;
