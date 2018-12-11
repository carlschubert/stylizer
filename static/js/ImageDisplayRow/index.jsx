import React, { Component, Fragment } from "react";
import PasticheCarousel from '../PasticheCarousel';

class ImageDisplayRow extends Component {

    state = {
        style: 0,
        content: 0,
        pastiche: 4,
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

        return (
            <div className="h-100 d-flex flex-nowrap justify-content-center align-items-center flex-column flex-md-row">
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

            </div>

        )
    }
}

export default ImageDisplayRow

