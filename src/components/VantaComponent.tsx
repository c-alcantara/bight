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

    if (
      prevProps.highColor !== this.props.highColor ||
      prevProps.midColor !== this.props.midColor ||
      prevProps.lowColor !== this.props.lowColor ||
      prevProps.base !== this.props.base
    ) {
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
        blurFactor: 0.6,
        speed: this.props.speed,
        zoom: 0.3,
      });
    }
  }

  startColorTransition(prevProps: Props) {
    const transitionDuration = prevProps.speed === 20 ? 1300 : 500; // Set transition duration based on speed
    const stepDuration = 10; // Step duration in milliseconds
    const steps = transitionDuration / stepDuration;

    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentStep += 1;
      const t = currentStep / steps; // Normalized time (from 0 to 1)

      // Interpolate each color component
      const newHighColor = this.interpolateColor(
        prevProps.highColor,
        this.props.highColor,
        t
      );
      const newMidColor = this.interpolateColor(
        prevProps.midColor,
        this.props.midColor,
        t
      );
      const newLowColor = this.interpolateColor(
        prevProps.lowColor,
        this.props.lowColor,
        t
      );

      // Update Vanta effect with new colors
      if (this.vantaEffect) {
        this.vantaEffect.setOptions({
          highlightColor: newHighColor,
          midtoneColor: newMidColor,
          lowlightColor: newLowColor,
        });
      }

      if (currentStep >= steps) clearInterval(intervalId);
    }, stepDuration);
  }

  interpolateColor(
    startColor: number | undefined,
    endColor: number | undefined,
    t: number
  ): number {
    if (startColor === undefined || endColor === undefined)
      return startColor || endColor || 0;

    const startRGB = [
      (startColor >> 16) & 255, // Red
      (startColor >> 8) & 255, // Green
      startColor & 255, // Blue
    ];

    const endRGB = [
      (endColor >> 16) & 255, // Red
      (endColor >> 8) & 255, // Green
      endColor & 255, // Blue
    ];

    const interpolatedRGB = startRGB.map((start, i) =>
      Math.round(start + (endRGB[i] - start) * t)
    );

    return (
      (interpolatedRGB[0] << 16) |
      (interpolatedRGB[1] << 8) |
      interpolatedRGB[2]
    );
  }

  updateSpeed() {
    const transitionDuration = this.props.speed === 20 ? 500 : 1100; // Set transition duration based on speed
    const stepDuration = 10;
    const steps = transitionDuration / stepDuration;

    let currentStep = 0;
    const startSpeed = this.vantaEffect?.options?.speed || this.props.speed;
    const speedStep = (this.props.speed - startSpeed) / steps;

    const intervalId = setInterval(() => {
      currentStep += 1;
      const newSpeed = startSpeed + speedStep * currentStep;

      if (this.vantaEffect) {
        this.vantaEffect.setOptions({
          speed: newSpeed,
          highlightColor: this.props.highColor,
          midtoneColor: this.props.midColor,
          lowlightColor: this.props.lowColor,
        });
      }

      if (currentStep >= steps) clearInterval(intervalId);
    }, stepDuration);
  }

  destroyVantaEffect() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
      this.vantaEffect = null;
    }
  }

  render() {
    return <div ref={this.sceneRef} className="w-full h-screen absolute z-0" />;
  }
}

export default VantaComponent;
