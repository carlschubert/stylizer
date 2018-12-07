import React, { Component, Fragment } from "react";
import { Card, CardImg } from 'reactstrap';
import PasticheCarousel from '../PasticheCarousel';

class ImageDisplayRow extends Component {

    state = {
        style: 0,
        content: 0,
        pastiche: 0,
    }


    next = (targetState, targetLength) => {
        return () => {
            const nextIndex = this.state[targetState] === targetLength - 1 ? 0 : this.state[targetState] + 1;
            this.setState({ [targetState]: nextIndex });
        }
    }

    previous = (targetState, targetLength) => {
        return () => {
            const nextIndex = this.state[targetState] === 0 ? targetLength - 1 : this.state[targetState] - 1;
            this.setState({ [targetState]: nextIndex });
        }
    }

    goToIndex = (targetState) => {
        return (newIndex) => {
            this.setState({ [targetState]: newIndex });
        }
    }

    render() {

        const { content, style, pastiche } = this.state
        const { contents, styles, interp_weights } = this.props.outputData;

        console.log('content',content)
        console.log('style', style)
        console.log('pastiche',pastiche)
        console.log('contents', contents);
        console.log('styles', styles);
        console.log('pastices', interp_weights[content][style]);

        return (
            <Fragment>
                <PasticheCarousel
                    items={contents}
                    activeIndex={content}
                    next={this.next('content', contents.length)}
                    previous={this.previous('content', contents.length)}
                    goToIndex={this.goToIndex('content')}
                />
                <PasticheCarousel
                    items={interp_weights[content][style]}
                    activeIndex={pastiche}
                    next={this.next('pastiche', interp_weights[content][style].length)}
                    previous={this.previous('pastiche', interp_weights[content][style].length)}
                    goToIndex={this.goToIndex('pastiche')}
                />
                <PasticheCarousel
                    items={styles}
                    activeIndex={style}
                    next={this.next('style', styles.length)}
                    previous={this.previous('style', styles.length)}
                    goToIndex={this.goToIndex('style')}
                />

            </Fragment>

        )
    }
}

export default ImageDisplayRow

