import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import AccommodationService from '../../../services/api/accommodation/accommodation.service';
import SearchBox from '../../../components/search/SearchBox';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { set } from 'date-fns';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalResults, setOriginalResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [availableData, setAvailableData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    breakfast: false,
    freeCancellition: false,
    hightRating: false,
    selectedTypes: []
  });

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || 1;

  const checkInDate = checkIn ? dayjs(checkIn).toDate().toDateString() : null;
  const checkOutDate = checkOut ? dayjs(checkOut).toDate().toDateString() : null;

  useEffect(() => {
    document.title = `| Barali Beach Resort`;
    fetchSearchResults();
  }, [searchParams]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const res = destination
        ? await AccommodationService.getSearch(destination, checkIn, checkOut, guests)
        : await AccommodationService.getAll();


      const results = res?.data || [];
      setOriginalResults(results);
      setFilteredResults(results);

      console.log(`results is`, results);

    } catch (error) {
      console.log('Error fetching search results:', error)

    } finally {
      setLoading(false);
    }
  }


  return (
    <Container className="my-4">
      <SearchBox />

      <Row className='mt-4'>
        <Col lg={3} className='mb-4'>
          <Card className='p-3 shadow-sm'>
            <h5 className='fw-bold mb-3'>ตัวกรอง</h5>
          </Card>
        </Col>
        <Col lg={9}>
          <Card className='p-3 shadow-sm'>
            <h5 className='fw-bold mb-3'>ผลการค้นหาใน {destination ? `"${destination}"` : 'ทุกจุดหมายปลายทาง'}</h5>
            <p>ปลายทาง: {destination}</p>
            <p>วันที่เช็คอิน: {checkInDate}</p>
            <p>วันที่เช็คเอาท์: {checkOutDate}</p>
            <p>จำนวนผู้เข้าพัก: {guests}</p>
          </Card>
        </Col>
        <Col>
        </Col>
      </Row>

    </Container>
  )
}
export default SearchPage