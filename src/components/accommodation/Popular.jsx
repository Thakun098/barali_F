import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import GetRoomAvailability from "../common/GetRoomAvailability";
import AccommodationService from "../../services/api/accommodation/accommodation.service";
import AccommodationCard from "./AccommodationCard";

const Popular = () => {
    const [populars, setPopulars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availabilityData, setAvailabilityData] = useState({});

    const checkInDate = dayjs().add(1, 'day').toDate();
    const checkOutDate = dayjs().add(2, 'day').toDate();



    useEffect(() => {
        const fetchData = async () => {
            if (checkInDate && checkOutDate) {
                const result = await GetRoomAvailability(checkInDate, checkOutDate);
                setAvailabilityData(result);
            }
        };

        fetchData();
    }, [checkInDate, checkOutDate]);

    useEffect(() => {
        fetchPopularAccommodations();
    }, []);

    const fetchPopularAccommodations = async () => {
        try {
            setLoading(true);
            const res = await AccommodationService.getPopularAccommodation();
            setPopulars(res?.data || []);
        } catch (error) {
            console.error("Error fetching popular accommodations:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="row">
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    {populars.length > 0 ? (
                        populars.map((acc) => (
                            <AccommodationCard
                                key={acc.id}
                                accommodation={acc}
                                availabilityRoom={availabilityData[acc.id] || 0}
                            />
                        ))
                    ) : (
                        <div className="text-center col-12">
                            <p className="text-danger">
                                ไม่สามารถโหลดข้อมูลห้องพักยอดนิยมได้
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Popular;