import React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';

const makeSrc = (url) => {

    // If we don't do this the browser will use a cached image
    const modified = Date.now().toString();

    return `${url}?lastmod=${modified}`
}

const PasticheCarousel = (props) => {
    const { items, next, previous, goToIndex, activeIndex, sessionId } = props;

    console.log('PasticheCarousel props', props);

    const slides = items.map((item) => {

        return (

            <CarouselItem
                key={item}
            >
                <img
                    style={{
                        'height': '200px',
                        'width': 'auto'
                    }}
                    src={makeSrc(item)}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
        >
            <CarouselIndicators items={items.map(item => { return { src: item } })} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}



export default PasticheCarousel;
