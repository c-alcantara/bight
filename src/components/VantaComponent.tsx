import React, { Component, RefObject, useEffect, useState } from 'react';
import fog from "vanta/dist/vanta.fog.min"
import * as THREE from "three";

interface Props {
  highColor?: number,
  midColor?: number,
  lowColor?: number,
  base?: number,
  speed: number
}

class VantaComponent extends Component<Props> {

  //const[transitionDuration, setTransitionDuration] = useState(1000);

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

    if (prevProps.highColor !== this.props.highColor ||
      prevProps.midColor !== this.props.midColor ||
      prevProps.lowColor !== this.props.lowColor ||
      prevProps.base !== this.props.base) {
      this.startColorTransition(prevProps);
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
        zoom: 0.4
      });
    }
  }

  startColorTransition(prevProps: Props) {

    var transitionDuration: any = '';
    
    if (prevProps.speed!= 18) {
      transitionDuration = 300; // Transition duration in milliseconds
    } else {
      transitionDuration = 3000; // Transition duration in milliseconds
    }
    const stepDuration = 10; // Step duration in milliseconds
    const steps = transitionDuration / stepDuration;

    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentStep += 1;
      const t = currentStep / steps; // Normalized time (from 0 to 1)

      // Interpolate each color component
      const newHighColor = this.interpolateColor(prevProps.highColor, this.props.highColor, t);
      const newMidColor = this.interpolateColor(prevProps.midColor, this.props.midColor, t);
      const newLowColor = this.interpolateColor(prevProps.lowColor, this.props.lowColor, t);
     

      this.vantaEffect.setOptions({
        highlightColor: newHighColor,
        midtoneColor: newMidColor,
        lowlightColor: newLowColor,

      });

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, stepDuration);
  }
  interpolateColor(startColor: number | undefined, endColor: number | undefined, t: number): number {
    if (startColor === undefined || endColor === undefined) return 0;
    const startRGB = [(startColor >> 16) & 255, (startColor >> 8) & 255, startColor & 255];
    const endRGB = [(endColor >> 16) & 255, (endColor >> 8) & 255, endColor & 255];
    const newRGB = startRGB.map((start, i) => Math.round(start + (endRGB[i] - start) * t));
    return (newRGB[0] << 16) | (newRGB[1] << 8) | newRGB[2];
  }
  updateSpeed() {
  if (this.vantaEffect) {

    var transitionDuration: any = '';

    if (this.props.speed != 18) {
      transitionDuration = 2250; // Transition duration in milliseconds
    } else {
      transitionDuration = 250; // Transition duration in milliseconds
    }

    const startSpeed = this.vantaEffect.options.speed;
    const endSpeed = this.props.speed;
    //const transitionDuration = 500; // Transition duration in milliseconds
    const stepDuration = 10; // Step duration in milliseconds
    const steps = transitionDuration / stepDuration;
    const speedStep = (endSpeed - startSpeed) / steps;

    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentStep += 1;
      const newSpeed = startSpeed + speedStep * currentStep;
      this.vantaEffect.setOptions({ speed: newSpeed, highlightColor: this.props.highColor, midtoneColor: this.props.midColor, lowlightColor: this.props.lowColor});

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, stepDuration);
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
        className=" w-full h-screen absolute z-0 transition-all duration-500 ease-out"
      />
    );
  }
}

export default VantaComponent;