import React, { Component } from "react";
import * as THREE from "three";
import woodTexture from "../image/sand.jpg";

class File extends Component {
  scene;
  camera;
  renderer;
  geomertry;
  material;
  cube;
  texture;
  componentDidMount() {
    this.init();
  }

  init() {
    // 建立場景
    this.scene = new THREE.Scene();
    // 建立透視相機
    // this.camera = new THREE.PerspectiveCamera("視角", "窗口長寬比", "表示從距離相機多遠的距離渲染", "表示距離相機多遠的距離停止渲染");
    this.camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    this.camera.position.z = 2;
    // 建立渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(600, 400);
    document.getElementById("element").appendChild(this.renderer.domElement);
    // 建立基礎幾何模型
    // this.geomertry = new THREE.BoxGeometry("x軸長(長) ", "y軸長(寬)", "z軸長(高)");
    this.geomertry = new THREE.BoxGeometry(1, 1, 1);
    // 建立材質
    this.texture = new THREE.TextureLoader().load(woodTexture);
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    // 融合模型與材質
    this.cube = new THREE.Mesh(this.geomertry, this.material);
    // 添加進去場景
    this.scene.add(this.cube);
    this.animate();
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <React.Fragment>
        <div id="element"></div>
      </React.Fragment>
    );
  }
}

export default File;
