import React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';

const PasticheCarousel = (props) => {
    const { items, next, previous, goToIndex, activeIndex } = props;

    console.log('PasticheCarousel props', props);

    const slides = items.map((item) => {
        return (
            <CarouselItem
                key={item}
            >
                <img style={{ 'maxWidth': '320px' }} src={item} />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items.map(item => { return { src: item }})} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}



export default PasticheCarousel;
