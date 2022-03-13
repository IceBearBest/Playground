import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Body, Runner } = Matter;
const DEGREES_TO_RADIANS = Math.PI / 180;
const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export function InitMatter(){
// Create an engine and renderer.
const engine = Engine.create();
const render = Render.create({
    element: document.getElementById("root"),
    engine: engine,
    options: {
        width: 800,
        height:600,
        wireframes:false,
        background: '#f4f4f8'
    }
});

const rectangle = Bodies.rectangle(400, 0, 120, 80, {restitution: 0.25, angle: Math.PI/4});
const circle = Bodies.circle(400, -150, 50, { friction: 0, restitution: 1 });
const triangle = Bodies.polygon(400, 0, 3, 50, { friction: 0, restitution: 0.5 });
const verticalPart = Bodies.rectangle(400, 150, 100, 50);
const horizontalPart = Bodies.rectangle(400, 150, 50, 100);
const cross = Body.create({
  parts: [verticalPart, horizontalPart],
  friction: 0,
  restitution: 1
});
const floor = Bodies.rectangle(400, 575, 800, 50, {isStatic: true});
const leftWall = Bodies.rectangle(-25, 400, 50, 800, { isStatic: true, friction: 0 });
const rightWall = Bodies.rectangle(825, 400, 50, 800, { isStatic: true, friction: 0 });
const obstacle1 = Bodies.circle(150, 200, 85, { isStatic: true, friction: 0, restitution: 1 });
const obstacle2 = Bodies.polygon(400, 400, 3, 75, {
  isStatic: true,
  angle: 90 * DEGREES_TO_RADIANS,
  friction: 0,
  restitution: 1
});
const obstacle3 = Bodies.circle(650, 200, 85, { isStatic: true, friction: 0, restitution: 1 });

World.add(engine.world, [rectangle,
    triangle,
    circle,
    floor,
    leftWall,
    rightWall,
    obstacle1,
    obstacle2,
    obstacle3, cross]);
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
document.querySelector("canvas").addEventListener("mousedown", () => {
    for (let i = 0; i < 5; i++) {
        const x = randomInRange(50, 750);
        const y = randomInRange(0, 50);
        const radius = randomInRange(25, 50);
        const sides = randomIntInRange(3, 6);
        const body = Bodies.polygon(x, y, sides, radius, {
          friction: 0,
          restitution: 0.5
        });
        World.add(engine.world, body);
      }
})
}