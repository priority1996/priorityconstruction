import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GatsbyImage from './GatsbyImage';
import FlatList from './FlatList';
import FlatListItem from './FlatListItem';
import InvisibleButton from './InvisibleButton';
import CloseIcon from './CloseIcon';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const GalleryOverlayTileImageHeight = pxToRem(120);
const GalleryOverlayPrimaryImage = styled(GatsbyImage)`
  height: 100%;
`;
const GalleryOverviewList = styled(FlatList)`
  display: none;

  @media (min-height: ${pxToRem(500)}) {
    display: flex;
  }

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000;
  height: ${GalleryOverlayTileImageHeight};
  overflow-x: scroll;
  overflow-y: hidden;
  transform: translateY(100%);

  .gatsby-image-outer-wrapper {
    position: absolute !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  ${GatsbyImage} {
    height: 100%;

    div {
      padding-bottom: 0 !important;
    }
  }
`;
const GalleryOverviewListItem = styled(FlatListItem)`
  min-width: 150px;
  &:not(:last-child) {
    margin-right: 0;
    margin-bottom: 0;
  }
`;
const GalleryOverviewCloseButton = styled(InvisibleButton)`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;

  ${CloseIcon} {
    stroke: #fff;
  }
`;

const GalleryTileButton = styled(InvisibleButton)`
  height: 100%;
  width: 100%;
  position: relative;
  border: 0.25rem solid transparent;

  &[aria-pressed='true'] {
    border-color: #fff;

    &:focus {
      outline: none;
    }
  }
`;

const GalleryInner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${pxToRem(1500)};
  max-height: calc(100vh - ${GalleryOverlayTileImageHeight});
  width: 100%;
`;

export class GalleryOverlay extends React.Component {
  static displayName = 'GalleryOverlay';

  static propTypes = {
    tag: CustomPropTypes.Tag,
    images: PropTypes.arrayOf(CustomPropTypes.ImageSharpWithAlt),
    selectedIndex: PropTypes.number,
    onResetSelection: PropTypes.func,
    onSelectImage: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    tag: 'section',
    images: [],
  };

  state = { selectedIndex: this.props.selectedIndex || 0 };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleSelectImageByIndex = selectedIndex => () => {
    this.setState({ selectedIndex });
    if (this.props.onSelectImage) {
      this.props.onSelectImage();
    }
  };

  handleResetSelection = () => {
    this.setState({ selectedIndex: null });
    if (this.props.onResetSelection) {
      this.props.onResetSelection();
    }
  };

  selectedImage = () => {
    if (this.state.selectedIndex === null) {
      return {
        sizes: {},
        alt: '',
      };
    }

    return this.props.images[this.state.selectedIndex];
  };

  handleSelectLeft = () => {
    if (this.state.selectedIndex === 0) {
      this.setState({ selectedIndex: this.props.images.length - 1 });
    } else {
      this.setState(state => ({
        selectedIndex: state.selectedIndex - 1,
      }));
    }
  };

  handleSelectRight = () => {
    if (this.state.selectedIndex === this.props.images.length - 1) {
      this.setState({ selectedIndex: 0 });
    } else {
      this.setState(state => ({
        selectedIndex: state.selectedIndex + 1,
      }));
    }
  };

  handleKeyDown = event => {
    if (event.keyCode === 27 && this.props.onClose) {
      this.props.onClose();
    } else if (event.keyCode === 39) {
      this.handleSelectRight();
    } else if (event.keyCode === 37) {
      this.handleSelectLeft();
    }
  };

  scrollSelectedIntoView = elm => {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(elm);
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
  };

  render() {
    const {
      tag: Tag,
      images,
      selectedIndex,
      onResetSelection,
      onSelectImage,
      ...rest
    } = this.props;
    const selectedImage = this.selectedImage();
    return (
      <Tag {...rest}>
        <GalleryInner>
          <GalleryOverviewCloseButton onClick={this.handleResetSelection}>
            <CloseIcon />
          </GalleryOverviewCloseButton>
          <GalleryOverlayPrimaryImage sizes={selectedImage.sizes} alt={selectedImage.alt} />
        </GalleryInner>
        <GalleryOverviewList>
          {images.map((image, i) => (
            <GalleryOverviewListItem key={image.id}>
              <GalleryTileButton
                onClick={this.handleSelectImageByIndex(i)}
                aria-pressed={i === this.state.selectedIndex}
                ref={i === this.state.selectedIndex && this.scrollSelectedIntoView}
              >
                <GatsbyImage sizes={image.sizes} alt={image.alt} />
              </GalleryTileButton>
            </GalleryOverviewListItem>
          ))}
        </GalleryOverviewList>
      </Tag>
    );
  }
}

export default styled(GalleryOverlay)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.95);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-height: ${pxToRem(500)}) {
    bottom: ${GalleryOverlayTileImageHeight};
  }
`;
