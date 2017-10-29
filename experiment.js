
	var renderer;
	var scene;
	var camera;
	var cameraBG;
	var stats;
	var controls;
	var backgroundCamera;
	var backgroundScene;
	var mesh2;
	var container;
	var eye;
	var dragControls;
	var objects=[];
	var cube;
	var control;
	var line1,line2,line3,line4;
	var gui;
	var img, img1;
	var object_prev, object_new;
	var planelens, planeimage;
	var curimage=0;
	//init();

	function init(){
		container = document.createElement('div');
		document.body.appendChild(container);

		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setClearColor(0x000000,1.0);
		renderer.setSize(window.innerWidth,window.innerHeight);
		document.body.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(27,window.innerWidth/window.innerHeight,0.1,10000);
		//camera.position.x = -10;
		//camera.position.y = 10;
		camera.position.z = 100;
		camera.lookAt(scene.position);

		controls = new THREE.OrbitControls(camera);
		// controls = new THREE.TrackballControls( camera );
		// controls.rotateSpeed = 1.0;
		// controls.zoomSpeed = 1.2;
		// controls.panSpeed = 0.8;
		// controls.noZoom = false;
		// controls.noPan = false;
		// controls.staticMoving = true;
		// controls.dynamicDampingFactor = 0.3;
		
		var map = new THREE.TextureLoader().load( "eyefinal2.png" );
        var planeGeometry = new THREE.PlaneGeometry(30, 25);
		var planeMaterial = new THREE.MeshLambertMaterial({map:map});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;
		//plane.rotation.x = -0.5 * Math.PI;
		plane.position.x = 37;
		//plane.transparent = true;
		scene.add(plane);
		var width = 1;

		var maplens = new THREE.TextureLoader().load("lens.png");
		var planelensgeo = new THREE.PlaneGeometry(3,8);
		var planelensmat = new THREE.MeshLambertMaterial({map:maplens, transparent:true,opacity:0.8});
		planelens = new THREE.Mesh(planelensgeo, planelensmat);
		planelens.receiveShadow = true;
		planelens.position.x = 29.5;
		scene.add(planelens);

		var mapimage = new THREE.TextureLoader().load("cube.png");
		var imagegeo = new THREE.PlaneGeometry(3.5,3.5);
		var imagemat = new THREE.MeshLambertMaterial({map:mapimage,transparent:true,opacity:0.8,opacity:0.6});
		planeimage = new THREE.Mesh(imagegeo,imagemat);
		planeimage.position.x = 41.5;
		scene.add(planeimage);
		///planelens.scale.set(width, height, 1);
       // scene.add( sprite );

		var cubeGeometry = new THREE.CubeGeometry(6, 6, 6);
		var cubeMaterial = new THREE.MeshPhongMaterial({
			color: "red",
			
		});
		cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.position.x = 0;
		cube.position.y = 0;
		cube.position.z = 0;
		cube.name = 'cube';
		cube.castShadow = true;
		scene.add(cube);
		cube.rotation.z = -0.25*Math.PI;
		cube.rotation.x = -0.4*Math.PI;
		//cube.rotation.y = -0.2*Math.PI;
		objects.push(cube);


		var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(30, 30, 30);
		scene.add(spotLight);
		
		var ambientLight = new THREE.AmbientLight(0x444444);
		scene.add(ambientLight);
		var directionalLight = new THREE.DirectionalLight(0xffffff,1);
		directionalLight.position = new THREE.Vector3(50,50,50);
		directionalLight.castShadow = true;
		scene.add(directionalLight);
		container.appendChild(renderer.domElement);
		var dragControls = new THREE.DragControls( objects, camera,renderer.domElement );
		dragControls.addEventListener( 'dragstart', function ( event ) { 
			controls.enabled = false; 
			object_prev = control.ObjectDistance;
			//alert(object_prev);
			});
		dragControls.addEventListener('drag',function(event){
			controls.enabled = false;
			object_new = (Math.ceil(cube.position.x));
			update();
			animate(object_prev, object_new);
		})
		dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = false;
				object_new = (Math.ceil(cube.position.x));
				//console.log(object_new);
				update();
				animate(object_prev, object_new);
				
		});

        var texture = THREE.ImageUtils.loadTexture('background1.jpeg');
        var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5, 5),
            new THREE.MeshBasicMaterial({
                map: texture
            }));

        backgroundMesh .material.depthTest = false;
        backgroundMesh .material.depthWrite = false;

        // Create your background scene
        backgroundScene = new THREE.Scene();
        backgroundCamera = new THREE.Camera();
        backgroundScene .add(backgroundCamera );
        backgroundScene .add(backgroundMesh );

        var lineMaterial = new THREE.LineBasicMaterial({color:"yellow"});
		var linegeometry1 = new THREE.Geometry();
		linegeometry1.vertices.push(new THREE.Vector3(cube.position.x,cube.position.y+3,0));
		linegeometry1.vertices.push(new THREE.Vector3(29.1,1,0));
		linegeometry1.vertices.push(new THREE.Vector3(43,-2,0));
		line1 = new THREE.Line(linegeometry1,lineMaterial);
		scene.add(line1);

		var lineMaterial = new THREE.LineBasicMaterial({color:"yellow"});
		var linegeometry2 = new THREE.Geometry();
		linegeometry2.vertices.push(new THREE.Vector3(cube.position.x,cube.position.y-3,0));
		linegeometry2.vertices.push(new THREE.Vector3(29.1,-1,0));
		linegeometry2.vertices.push(new THREE.Vector3(43,2,0));
		line2 = new THREE.Line(linegeometry2,lineMaterial);
		scene.add(line2);

		var lineMaterial = new THREE.LineBasicMaterial({color:"yellow"});
		var linegeometry3 = new THREE.Geometry();
		linegeometry3.vertices.push(new THREE.Vector3(cube.position.x,cube.position.y+3,0));
		linegeometry3.vertices.push(new THREE.Vector3(43,-2,0));
		line3 = new THREE.Line(linegeometry3,lineMaterial);
		//scene.add(line3);

		var lineMaterial = new THREE.LineBasicMaterial({color:"yellow"});
		var linegeometry4 = new THREE.Geometry();
		linegeometry4.vertices.push(new THREE.Vector3(cube.position.x,cube.position.y-3,0));
		linegeometry4.vertices.push(new THREE.Vector3(43,2,0));
		line4 = new THREE.Line(linegeometry4,lineMaterial);
		//scene.add(line4);


		control = new function(){
			this.ObjectDistance= (cube.position.x);
			this.ImageDistance = 1.7;
			this.FocalLength = 1.824;
		};
		// var x = document.createElement("IMG");
	 //    x.setAttribute("src", "eyefinal.png");
	 //    x.setAttribute("width", "304");
	 //    x.setAttribute("height", "228");
	 //    x.setAttribute("alt", "The Pulpit Rock");
	 //    document.body.appendChild(x);
		//loadModel();
		addControlGui(control);
		addStatsObject();
		render();

	}
	
	function animate(x,y){
		var maxwidth = 2.3;
		if(y>=0){
			if(curimage == 0){
				planeimage.material.map = THREE.ImageUtils.loadTexture( "cube_gblur2.png" );
				planeimage.material.needsUpdate = true;
				curimage = 1;
			}
			
			planelens.scale.x = 1;
		}else if(y<0){
			if(curimage == 1){
				planeimage.material.map = THREE.ImageUtils.loadTexture( "cube.png" );
				planeimage.material.needsUpdate = true;	
				curimage = 0;
			}
			if(y>=-35){	
				planelens.scale.x = (55-Math.abs(y))/55;
			}else{
				planelens.scale.x = 0.32;
			}
			// if(y<x && y>-39){
			// 	//reduce
			// 	planelens.scale.x = (60-Math.abs(cube.position.x))/60;
			// }else if(y>x){
			// 	//increase
			// 	planelens.scale.x = (60-Math.abs(cube.position.x))*0.01666;
			// }else if(y<=-39){
			// 	planelens.scale.x = 0.01666;
			// }
		}

	}
	function addControlGui(controlObject) {
			gui = new dat.GUI();
			//gui.add(controlObject, 'ObjectDistance', -0.01, 0.01);
			//gui.add(controlObject, 'ImageDistance', 0.1, 1);
			//gui.add(controlObject, 'FocalLength',0,0);
			gui.add(control, 'ObjectDistance').listen();
			gui.add(control, 'ImageDistance').listen();
			gui.add(control, 'FocalLength').listen();

	}

	// function loadEye(){
	// 	img = document.createElement("IMG");
	// 	img.setAttribute("src","eyefinal.png");
	// 	img.setAttribute("width","300");
	// 	img.setAttribute("height","300");
	// 	return img;
	// }

// 	function loadModel(){
// 		var loader = new THREE.JSONLoader();
// 		loader.load("eyemodelnew9.js",function(model){
// 			var material = new THREE.MeshBasicMaterial();
// 			material.map = THREE.ImageUtils.loadTexture("humaneye2.jpg");
// 			mesh2 = new THREE.Mesh(model, material);
// 			mesh2.position.x = 35;
// 			mesh2.position.y = 0;
// 			mesh2.position.z = -5;
// 			//mesh.material[0].transparent = true;
// 			scene.add(mesh2);
// 	});
		
// }

function reset(){
	cube.position.x = 0;
	cube.position.y = 0;
	cube.position.z = 0;
}

function update(){
	scene.updateMatrixWorld(true);
	var position = new THREE.Vector3();
	position.getPositionFromMatrix(cube.matrixWorld);
	//alert(position.x);

	line1.geometry.verticesNeedUpdate = true;
	line2.geometry.verticesNeedUpdate = true;
	line3.geometry.verticesNeedUpdate = true;
	line4.geometry.verticesNeedUpdate = true;

	//alert(line1.geometry.vertices[0].x);

	line1.geometry.vertices[0].x = position.x;
	line1.geometry.vertices[0].y = position.y+3;
	line1.geometry.vertices[0].z = position.z;

	line2.geometry.vertices[0].x = position.x;
	line2.geometry.vertices[0].y = position.y-3;
	line2.geometry.vertices[0].z = position.z;

	// line3.geometry.vertices[0].x = position.x;
	// line3.geometry.vertices[0].y = position.y+3;
	// line3.geometry.vertices[0].z = position.z;

	// line4.geometry.vertices[0].x = position.x;
	// line4.geometry.vertices[0].y = position.y-3;
	// line4.geometry.vertices[0].z = position.z;
	
	//alert(Math.abs(cube.position.x-41));
	control.ObjectDistance = (cube.position.x);
	if(cube.position.x>=0){
		control.FocalLength = 1.824;
	}else{
		control.FocalLength = ((55-cube.position.x) * 1.8)/((55-cube.position.x) - 1.8);
	}
	
	

}
	function addStatsObject(){
		stats = new Stats();
		stats.setMode(0);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		document.body.appendChild( stats.domElement );

	}

	function render(){
		requestAnimationFrame(render);
		renderer.autoClear = false;
		renderer.clear();
		renderer.render(backgroundScene,backgroundCamera);
		controls.enabled = false;
		controls.update();
		stats.update();
		line1.geometry.verticesNeedUpdate = true;
		line2.geometry.verticesNeedUpdate = true;
		line3.geometry.verticesNeedUpdate = true;
		line4.geometry.verticesNeedUpdate = true;
		renderer.render(scene, camera);			
	}
	//window.onload = init;