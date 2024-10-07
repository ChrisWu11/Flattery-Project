import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GenQoutes from '../components/GenQoutes';
import { images } from '../data/preload-image-list.json';
import { propose, qoutes } from '../data/quotes.json';

const Proposal = ({ className = '' }) => {
    // const { id } = useParams();
    // const person = id.split('-').join(' ');

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: '/Flattery-Project/images/image-05.webp',
        subtext: 'I want to tell you something',
    });
    const [textIndex, setTextIndex] = useState(0);

    // add quotes
    const addQoutes = () => {
        // const qoute = texts.length >= qoutes.length ? propose : genRandom(qoutes, texts);
        let qoute;
        if (textIndex === 5) {
            qoute = propose;
        } else {
            qoute = qoutes[textIndex];
            setTextIndex(textIndex + 1);
        }
        setCurrentText((prevData) => ({ ...prevData, ...qoute }));
        setTexts((prevData) => [...prevData, qoute]);
    };

    // handle click
    const handleClick = (e) => {
        const button = e.target;
        // remove previous shaking effect
        button.classList.remove('shake');
        // add quote
        addQoutes();
        // add shaking effect
        button.classList.add('shake');
        // remove shaking effect
        setTimeout(() => {
            button.classList.remove('shake');
        }, 1000);
    };

    // effects
    useEffect(() => {
        document.title = `Smile - Laughing 姐`;
    }, []);

    // preload images
    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <div
            className={`proposal ${className}`}
            style={{
                '--image': `url(${currentText.image})`,
            }}
        >
            {/* <audio src="/music/perfect.mp3" autoPlay="autoplay" loop="loop" /> */}
            <div className="proposal_media bg-dark d-none d-md-block" />
            <Container>
                <Row>
                    <Col md={6} className="ms-auto">
                        <div className="proposal_content py-5">
                            <div className="proposal_header">
                                <h1 className="proposal_title h4">
                                    Hey <b>Laughing姐</b>
                                </h1>
                                <p className="propsal_subtitle">{currentText.subtext}</p>
                            </div>

                            <GenQoutes texts={texts} className="main-content" />

                            {currentText.id !== 'finished' ? (
                                <Button variant="danger" onClick={handleClick}>
                                    {texts.length ? 'Next' : 'Continue'}
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Proposal;

function AudioPlayer() {
    const audioRef = useRef(null);

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

    return (
        <div>
            <audio ref={audioRef} src="/music/perfect.mp3" />
            <button onClick={handlePlay}>播放</button>
            <button onClick={handlePause}>暂停</button>
        </div>
    );
}
