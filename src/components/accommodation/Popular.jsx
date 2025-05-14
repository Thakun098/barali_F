import { useEffect, useState } from "react";
import AccommodationService from "../../services/api/accommodation/accommodation.service";
import AccommodationCard from "./AccommodationCard";
import { Spinner } from "react-bootstrap";

const Popular = () => {
    const [populars, setPopulars] = useState([]);
    const [loading, setLoading] = useState(true);

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