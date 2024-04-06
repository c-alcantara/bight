import React, { Component, RefObject } from 'react';
import fog from "vanta/dist/vanta.fog.min"
import * as THREE from "three";

interface Props {
  highColor?: number,
  midColor?: number,
  lowColor?: number,
  base?: number,
  speed?: number
}

class VantaComponent extends Component<Props> {
  private sceneRef: RefObject<HTMLDivElement>;
  private vantaEffect: any;

  constructor(props: Props) {
    super(props);
    this.sceneRef = React.createRef();
    this.vantaEffect = null;
  }

  componentDidMount() {
    this.initVantaEffect();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.speed !== this.props.speed) {
      this.updateSpeed();
    }
  }

  componentWillUnmount() {
    this.destroyVantaEffect();
  }

  initVantaEffect() {
    if (!this.vantaEffect) {
      this.vantaEffect = fog({
        THREE,
        el: this.sceneRef.current,
        highlightColor: this.props.highColor,
        midtoneColor: this.props.midColor,
        lowlightColor: this.props.lowColor,
        baseColor: this.props.base,
        blurFactor: .9,
        speed: this.props.speed,
        zoom: 0.50
      });
    }
  }



  updateSpeed() {
    if (this.vantaEffect) {
      this.vantaEffect.setOptions({ speed: this.props.speed, highlightColor: this.props.highColor });
    }
  }

  destroyVantaEffect() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
      this.vantaEffect = null;
    }
  }

  render() {
    return (
      <div
        ref={this.sceneRef}
        className="w-full h-screen absolute z-0 transition-speed duration-700 ease-in-out"
      />
    );
  }
}

export default VantaComponent;