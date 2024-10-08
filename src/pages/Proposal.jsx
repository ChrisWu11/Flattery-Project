import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import GenQoutes from '../components/GenQoutes';
import { images } from '../data/preload-image-list.json';
import { propose, qoutes } from '../data/quotes.json';
import './Proposal.css';

const Proposal = ({ className = '' }) => {
    // const { id } = useParams();
    // const person = id.split('-').join(' ');
    const smileImgSrc = '/Flattery-Project/images/smile.webp';
    const isPlay = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // const smileImgSrc = '/images/smile.webp';
    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: '/Flattery-Project/images/image-05.webp',
        subtext: 'The most beautiful girl in MINISO',
    });
    const [textIndex, setTextIndex] = useState(0);

    // add quotes
    const addQoutes = () => {
        // const qoute = texts.length >= qoutes.length ? propose : genRandom(qoutes, texts);
        let qoute;
        if (textIndex === qoutes.length) {
            qoute = propose;
        } else {
            qoute = qoutes[textIndex];
            setTextIndex(textIndex + 1);
        }
        setCurrentText((prevData) => ({ ...prevData, ...qoute }));
        setTexts((prevData) => [...prevData, qoute]);
        setActiveIndex(texts.length);
    };

    const playAudio = () => {
        if (isPlay.current === false) {
            const audio = document.getElementById('myAudio');
            audio.play();
            isPlay.current = true;
        }
    };

    // handle click
    const handleClick = (e) => {
        playAudio();
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

    const changeCard = (item) => () => {
        const index = texts.findIndex((_) => _.id === item.id);
        setActiveIndex(index);
        setCurrentText({
            image: texts[index].image,
            subtext: currentText.subtext,
        });
    };

    // effects
    useEffect(() => {
        document.title = `Smile - Laughing 姐`;
        // playAudio();
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

                            <GenQoutes
                                texts={texts}
                                className="main-content"
                                activeIndex={activeIndex}
                                changeCard={changeCard}
                            />

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
                <img className="smileImg" src={smileImgSrc} alt="miniso最漂亮的姐姐" />
                <audio id="myAudio" controls autoPlay hidden>
                    <source src="/Flattery-Project/music/perfect.mp3" type="audio/mpeg" />
                    <embed src="/Flattery-Project/music/perfect.mp3" />
                </audio>
            </Container>
        </div>
    );
};

export default Proposal;
