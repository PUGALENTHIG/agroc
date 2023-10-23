import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../Income/manage_income.css';
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import { Container, Row, Col, Form, FormControl, Card } from 'react-bootstrap';

function ManageIncome() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLandId, setSelectedLandId] = useState('');
    const [landNames, setLandNames] = useState([]);

    const history = useHistory();


    useEffect(() => {
        submitSets(submitCollection.manageland, false).then((res) => {
            setLandNames(res.extra);
        });
    }, [data]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLandChange = (event) => {
        const newSelectedLandId = event.target.value;
        setSelectedLandId(newSelectedLandId);
    };


    useEffect(() => {
        console.log("selected land : ", selectedLandId);

        if (selectedLandId) {
            axios.get(`http://localhost:8080/service/master/incomeFindByLandId/${selectedLandId}`).then((res) => {
                setData(res.data.extra);
                console.log(res.data.extra);
            });
        } else {
            setData([]);
        }
    }, [selectedLandId]);

    // const redirectToInsertLot = () => {
    //     history.push({
    //         pathname: '/insertincome',
    //         state: { landId: selectedLandId }
    //     });
    // };


    return (
        <Container className='manageLots'>
            <Row className='mb-4'>
                <Col>
                    <h2>Manage Income</h2>
                </Col>
            </Row>

            <Row className='mb-4'>
                <Col md={6}>
                    <Form inline>
                        <FormControl
                            type='text'
                            placeholder='Search Lots'
                            className='mr-sm-2'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Form>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Filter by Land:</Form.Label>
                        <Form.Control as="select" value={selectedLandId} onChange={handleLandChange}>
                            <option value="">All Lands</option>
                            {landNames.map((land) => (
                                <option key={land.id} value={land.id}>
                                    {land.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                {data.map((income) => (
                    <Col key={income.id} md={4} sm={6} xs={12} className='mb-4'>
                        <Card>
                            <Card.Body>
                                <Card.Title>{income.name}</Card.Title>
                                <Card.Text>
                                    Area: {income.area} {income.areaUOM}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* <Row className='mt-4'>
                <Col>
                    <button className="btn btn-primary" onClick={redirectToInsertLot}>
                        Add New Lot
                    </button>
                </Col>
            </Row> */}
        </Container>
    );
}

export default ManageIncome