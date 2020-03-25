import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";

let scene, renderer, camera, cube;

class App extends Component {
  componentDidMount() {
    // 建立場景
    scene = new THREE.Scene();
    // 建立渲染器
    renderer = new THREE.WebGLRenderer();
    // 場景大小
    renderer.setSize(600, 400);
    // 背景色
    renderer.setClearColor(0xffe4e1, 1.0);
    // 陰影效果
    renderer.shadowMap.enable = true;
    // 將渲染器生成在元素上
    document.getElementById("threejs").appendChild(renderer.domElement);
    // 建立相機
    camera = new THREE.PerspectiveCamera(45, 600 / 400, 0.1, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);
    // 建立光源
    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    // 建立物體
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xadd8e6 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);
    this.start();
  }

  start() {
    this.animate();
    requestAnimationFrame(this.start.bind(this));
    renderer.render(scene, camera);
  }

  animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  render() {
    return (
      <div>
        <Title>Three.js | erniexx</Title>
        <Board id="threejs"></Board>
      </div>
    );
  }
}

export default App;

const Title = styled.div`
  position: fixed;
  transform: rotate(-90deg);
  top: 50%;
`;

const Board = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
