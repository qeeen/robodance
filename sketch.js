let body_yrot = 0;
let body_zrot = 0;

let upper_yrot1 = 0;
let upper_zrot1 = 0;

let forearm_yrot1 = 0;
let forearm_zrot1 = 0;

let upper_yrot2 = 0;
let upper_zrot2 = 0;

let forearm_yrot2 = 0;
let forearm_zrot2 = 0;

let z_rot = 0;

let steel_tex;

function preload(){
	steel_tex = loadImage('assets/steel.jpg');
}

function setup(){
	createCanvas(768, 768, WEBGL);
}

function draw() {
	background(0);
	lights();
	camera(0, -100, (height/2.0)/tan(PI*30.0/180.0), 0, -100, 0, 0, 1, 0);

	upper_zrot1 = -130;
	upper_zrot2 = 130;

	upper_yrot1 = radians(map(sin(frameCount/5), -1, 1, -180, -90));
	forearm_yrot1 = radians(map(sin(frameCount/5), -1, 1, 135, 45));

	upper_yrot2 = radians(map(cos(frameCount/5), -1, 1, 90, 180));
	forearm_yrot2 = radians(map(cos(frameCount/5), -1, 1, -45, -135));

	z_rot = frameCount/10;

	//rotate entire scene to make it visible
	rotateX(radians(70));

	//ground plane
	fill(50, 255, 120);
	noStroke();
	plane(1000);

	//robots
	draw_robot(0, 100, 200);

	draw_robot(150, 0, 200);
	draw_robot(-150, 0, 200);

	draw_robot(300, -100, 200);
	draw_robot(-300, -100, 200);
}

function draw_robot(x, y, z){
	//body
	push();
		//fill(0, 255, 255);
		texture(steel_tex);
		translate(x, y, z);
		rotateZ(z_rot);
		box(100, 50, 200);

		push();
			translate(0, 0, 115)
			box(30, 30, 30);
		pop();

		//legs
		push();
			translate(-50, 0, -150);
			box(30, 30, 100);
		pop();
		push();
			translate(50, 0, -150);
			box(30, 30, 100);
		pop();

		// upper arm
		push();
			translate(-50, 0, 100);
			transformAndRnderRobotArm(upper_yrot1, upper_zrot1);

			// forearm
			push();
				translate(0, 0, 50);
				transformAndRnderRobotArm(forearm_yrot1, forearm_zrot1);
			pop();
		pop();

		//upper arm 2
		push();
			translate(50, 0, 100);
			transformAndRnderRobotArm(upper_yrot2, upper_zrot2);

			// forearm 2
			push();
				translate(0, 0, 50);
				transformAndRnderRobotArm(forearm_yrot2, forearm_zrot2);
			pop();
		pop();
	pop();
}

function transformAndRnderRobotArm(yrot, zrot) {
	rotateY(yrot);
	rotateZ(zrot);
	noStroke();
	translate(0, 0, 50);
	box(30, 30, 100);
}
