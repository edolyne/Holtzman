// @flow
import { Component } from "react";
import TagSelect from "../forms/TagSelect";

type ITagGallery = {
  id: string,
  overlay: string,
  buttonColor: string,
  disabledColor: string,
  tags: Object[],
}

class TagGallery extends Component {
  props: ITagGallery;
  state = {
    tagActive: "",
    activeImage1x1: this.props.tags[0].image1x1,
    activeImage2x1: this.props.tags[0].image2x1,
    activeImageAlt: this.props.tags[0].imageAlt,
    activeLabel: this.props.tags[0].label,
    activeValue: this.props.tags[0].value,
    activeCopy: this.props.tags[0].copy,
  }

  tagClick = (value: string) => {
    this.setState(() => {
      const activeButton = this.props.tags.find((item) => (
        item.value === value
      )) || {};

      return {
        activeImage1x1: activeButton.image1x1,
        activeImage2x1: activeButton.image2x1,
        activeImageAlt: activeButton.imageAlt,
        activeLabel: activeButton.label,
        activeValue: activeButton.value,
        activeCopy: activeButton.copy,
      };
    });
  }

  render() {
    return (
      <div>
        <style>
          {
            `#${this.props.id} .tag--clickable:hover { background-color: ${this.props.buttonColor}; }
            #${this.props.id} .tag--active { background-color: ${this.props.buttonColor}; }
            #${this.props.id} .tag--disabled { background-color: ${this.props.disabledColor} }`
          }
        </style>
        <TagSelect
          items={this.props.tags}
          onClick={this.tagClick}
          overrideActive={false}
          currentActive={this.state.tagActive}
        />
        <div className="one-whole three-fourths@lap-and-up text-center display-inline-block soft">
          <div className="ratio--landscape@lap-and-up ratio--square soft@handheld one-whole constrain-copy">
            <div className="ratio__item floating one-whole rounded" style={{ background: `linear-gradient(${this.props.overlay}, ${this.props.overlay}), url('${this.state.activeImage2x1}') center 20%` }}>
              <div className="floating__item one-half@lap-and-up text-light-primary one-whole soft">
                <h1 className="" style={{ fontWeight: "900" }}>{this.state.activeLabel}</h1>
                <h3 className="flush">{this.state.activeCopy}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TagGallery;
