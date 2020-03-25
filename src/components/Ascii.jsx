import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var camera, scene, renderer, startTime, object, stats;

class Ascii extends Component {
  componentDidMount() {
    this.init();
    this.animate();
  }
  init() {
    // 建立場景
    scene = new THREE.Scene();
    // 建立相機
    camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16);
    camera.position.set(0, 1.3, 3);
    // 建立鎂光燈
    scene.add(new THREE.AmbientLight(0x505050));
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set(2, 3, 3);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    // 建立直射燈
    var dirLight = new THREE.DirectionalLight(0x55505a, 1);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    var localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);
    var globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);
    // 建立材質
    var material = new THREE.MeshPhongMaterial({
      color: 0x80ee10,
      shininess: 100,
      side: THREE.DoubleSide,
      clippingPlanes: [localPlane],
      clipShadows: true,
    });
    // 建立物件
    var geometry = new THREE.TorusKnotBufferGeometry(0.4, 0.08, 95, 20);
    object = new THREE.Mesh(geometry, material);
    // 物件陰影
    object.castShadow = true;
    scene.add(object);
    // 建立地板
    var ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(9, 9, 1, 1),
      new THREE.MeshPhongMaterial({ color: 0xf8dbcc })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    // 設定狀態
    const element = document.getElementById("threejs");
    stats = new Stats();
    element.appendChild(stats.dom);
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 400);
    renderer.setClearColor(0xf8dbcc, 1.0);
    element.appendChild(renderer.domElement);
    // ***** Clipping setup (renderer): *****
    var globalPlanes = [globalPlane],
      Empty = Object.freeze([]);
    renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
    renderer.localClippingEnabled = true;

    // Controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    // GUI
    var gui = new GUI(),
      folderLocal = gui.addFolder("Local Clipping"),
      propsLocal = {
        get Enabled() {
          return renderer.localClippingEnabled;
        },
        set Enabled(v) {
          renderer.localClippingEnabled = v;
        },

        get Shadows() {
          return material.clipShadows;
        },
        set Shadows(v) {
          material.clipShadows = v;
        },

        get Plane() {
          return localPlane.constant;
        },
        set Plane(v) {
          localPlane.constant = v;
        },
      },
      folderGlobal = gui.addFolder("Global Clipping"),
      propsGlobal = {
        get Enabled() {
          return renderer.clippingPlanes !== Empty;
        },
        set Enabled(v) {
          renderer.clippingPlanes = v ? globalPlanes : Empty;
        },

        get Plane() {
          return globalPlane.constant;
        },
        set Plane(v) {
          globalPlane.constant = v;
        },
      };
    folderLocal.add(propsLocal, "Enabled");
    folderLocal.add(propsLocal, "Shadows");
    folderLocal.add(propsLocal, "Plane", 0.3, 1.25);
    folderGlobal.add(propsGlobal, "Enabled");
    folderGlobal.add(propsGlobal, "Plane", -0.4, 3);
    // Start
    startTime = Date.now();
    // 螢幕尺寸縮放變更
    // window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    // var currentTime = Date.now();
    // var time = (currentTime - startTime) / 1000;
    requestAnimationFrame(this.animate.bind(this));
    // object.position.y = 0.8;
    // object.rotation.x = time * 0.5;
    // object.rotation.y = time * 0.2;
    // object.scale.setScalar(Math.cos(time) * 0.125 + 0.875);
    renderer.render(scene, camera);
  }

  render() {
    return (
      <Content>
        <div id="threejs"></div>
      </Content>
    );
  }
}

export default Ascii;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
