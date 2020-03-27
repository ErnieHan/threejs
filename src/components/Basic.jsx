import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, renderer, camera, cube;

class Basic extends Component {
  componentDidMount() {
    this.init();
    this.start();
  }

  init() {
    // 建立場景
    scene = new THREE.Scene();
    // 建立渲染器
    renderer = new THREE.WebGLRenderer();
    // 場景大小
    renderer.setSize(600, 400);
    // 背景色
    renderer.setClearColor(0xfdd1be, 1.0);
    // 陰影效果
    renderer.shadowMap.enable = true;
    // 將渲染器生成在元素上
    document.getElementById("threejs").appendChild(renderer.domElement);
    // 建立相機
    camera = new THREE.PerspectiveCamera(10, 600 / 400, 0.1, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);
    // 建立光源
    let pointLight = new THREE.PointLight(0xffffff);
    let pointLight2 = new THREE.PointLight(0xffffff);
    pointLight2.position.set(30, -30, 30);
    pointLight.position.set(1, 1, 1);
    scene.add(pointLight);
    scene.add(pointLight2);
    // 建立物體
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xadd8e6 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);
    // 設定滑鼠可滾動
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 20;
    // 滑鼠滾動無法直達底部
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    // 偵測滑鼠滑動事件
    controls.addEventListener("change", this.handleControls);
  }

  handleControls = e => {};

  start() {
    // 執行旋轉動畫
    // this.animate();
    requestAnimationFrame(this.start.bind(this));
    renderer.render(scene, camera);
  }

  animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  render() {
    return (
      <React.Fragment>
        <Content>
          <Left></Left>
          <Center id="threejs"></Center>
          <Right></Right>
        </Content>
      </React.Fragment>
    );
  }
}

export default Basic;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Left = styled.div`
  width: 25%;
`;

const Right = styled.div`
  width: 25%;
  height: 100%;
  background: #fde9df;
`;

const Center = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
