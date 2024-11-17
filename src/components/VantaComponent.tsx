"use client";
import React, { Component, RefObject } from "react";
import fog from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

interface Props {
  highColor?: number;
  midColor?: number;
  lowColor?: number;
  base?: number;
  speed: number;
  blur:number;
}

class VantaComponent extends Component<Props> {
  private sceneRef: RefObject<HTMLDivElement>;
  private vantaEffect: any;
  private animationFrameId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.sceneRef = React.createRef();
    this.vantaEffect = null;
  }

  componentDidMount() {
    this.initVantaEffect();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.speed !== this.props.speed ||
      prevProps.blur !== this.props.blur ||
      prevProps.highColor !== this.props.highColor ||
      prevProps.midColor !== this.props.midColor ||
      prevProps.lowColor !== this.props.lowColor ||
      prevProps.base !== this.props.base
    ) {
      this.updateVantaEffect();
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
        blurFactor: this.props.blur,
        speed: this.props.speed,
        zoom: 0.2,
      });
    }
  }

  updateVantaEffect() {
    if (this.vantaEffect) {
      const update = () => {
        this.vantaEffect.setOptions({
          speed: this.props.speed,
          blurFactor: this.props.blur,
          highlightColor: this.props.highColor,
          midtoneColor: this.props.midColor,
          lowlightColor: this.props.lowColor,
        });
        this.animationFrameId = requestAnimationFrame(update);
      };
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      update();
    }
  }

  destroyVantaEffect() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
      this.vantaEffect = null;
    }
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return <div ref={this.sceneRef} className="w-full h-screen absolute z-0" />;
  }
}

export default VantaComponent;
