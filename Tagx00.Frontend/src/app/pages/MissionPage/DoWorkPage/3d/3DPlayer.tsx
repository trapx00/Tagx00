import React from "react";
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import Stats from 'stats-js';
import { ThreeDimensionModelUrl } from "../../../../models/mission/3d/3dModelUrl";


interface Props {
  url: ThreeDimensionModelUrl;
}

export class ThreeDimensionPlayer extends React.Component<Props, any> {

  renderer;
  camera;
  scene;
  stats;
  light;
  controls;

  containerRef = React.createRef<HTMLDivElement>();


  initModel() {

    const mtlLoader = new MTLLoader();

    //加载mtl文件

    mtlLoader.load(this.props.url.mtlUrl, (material) => {

      const objLoader = new OBJLoader();

      //设置当前加载的纹理

      objLoader.setMaterials(material);

      objLoader.load(this.props.url.objUrl, (object) => {

        object.position.y = 0;
        object.rotation.y = 0.5;
        object.scale.set(0.05, 0.05, 0.05);
        this.scene.add(object);

      })

    });
  }

  componentDidMount() {

    // init renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    this.renderer.setClearColor(0xffffff);
    this.containerRef.current.appendChild(this.renderer.domElement);


    // init camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set(0, 40, 50);

    this.camera.lookAt(new THREE.Vector3(0, 0, 0));


    // init scene

    this.scene = new THREE.Scene();


    //初始化性能插件

    this.stats = new Stats();


    // init light

    this.scene.add(new THREE.AmbientLight(0x444444));


    this.light = new THREE.PointLight(0xffffff);

    this.light.position.set(0, 50, 0);


    //告诉平行光需要开启阴影投射

    this.light.castShadow = true;


    this.scene.add(this.light);


    // init model
    this.initModel();


    //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放


    this.controls = new Orbitcontrols(this.camera, this.renderer.domElement);


    // 如果使用animate方法时，将此函数删除

    //controls.addEventListener( 'change', render );

    // 使动画循环使用时阻尼或自转 意思是否有惯性

    this.controls.enableDamping = true;

    //动态阻尼系数 就是鼠标拖拽旋转灵敏度

    //controls.dampingFactor = 0.25;

    //是否可以缩放

    this.controls.enableZoom = true;

    //是否自动旋转

    this.controls.autoRotate = true;

    //设置相机距离原点的最远距离

    this.controls.minDistance = 1;

    //设置相机距离原点的最远距离

    this.controls.maxDistance = 200;

    //是否开启右键拖拽

    this.controls.enablePan = true;


    const animate = () => {

      //更新控制器

      this.renderModel();


      //更新性能插件

      this.stats.update();


      this.controls.update();


      requestAnimationFrame(animate);

    };


    animate();

    window.onresize = this.onWindowResize;

  }

  renderModel() {
    this.renderer.render(this.scene, this.camera);
  }

//窗口变动触发的函数

  onWindowResize = () => {


    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();

    this.renderModel();

    this.renderer.setSize(window.innerWidth, window.innerHeight);


  };

  render() {
    return <div ref={this.containerRef}/>;
  }
}
