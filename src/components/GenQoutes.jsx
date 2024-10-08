import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

const GenQoutes = ({ className = '', texts = [], activeIndex, changeCard }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        // if (scrollRef && texts.length) {
        //     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        // }
    }, [scrollRef, texts]);

    return (
        <div className={`qoutes ${className}`}>
            {texts.length
                ? texts.map((item, index) => (
                      <Card
                          body
                          key={item.id}
                          bg={index === activeIndex ? 'danger' : 'default'}
                          text={index === activeIndex ? 'light' : 'dark'}
                          className={`qoutes_card animIn ${index === texts.length ? 'last' : ''}`}
                          onClick={changeCard(item)}
                      >
                          <p className={`card-text mb-0 `}>{item.text}</p>
                      </Card>
                  ))
                : ''}

            <div className="dummyscroll" style={{ float: 'left', clear: 'both' }} ref={scrollRef} />
        </div>
    );
};

export default GenQoutes;
