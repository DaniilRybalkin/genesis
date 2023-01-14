import './style.css'
import * as THREE from 'three'
import { Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'

//Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//Textures
const textureLoader = new THREE.TextureLoader()

const floortexture = textureLoader.load('/textures/matcaps/2.png')
const boxtexture = textureLoader.load('/textures/123.png')
const matcaptexture = textureLoader.load('/textures/matcaps/8.png')
const matcaptexture2 = textureLoader.load('/textures/matcaps/3.png')

// Materials


const boxmaterial = new THREE.MeshLambertMaterial()
boxmaterial.map = boxtexture

const normalmaterial = new THREE.MeshNormalMaterial()
// normalmaterial.wireframe = true

const floormaterial = new THREE.MeshMatcapMaterial()
floormaterial.matcap = floortexture

const spherematerial = new THREE.MeshMatcapMaterial()
spherematerial.matcap = matcaptexture

const knotmaterial = new THREE.MeshMatcapMaterial()
knotmaterial.matcap = matcaptexture2
knotmaterial.wireframe = true

//Objects

const geometry = new THREE.BoxGeometry(1, 1, 1)
const box = new THREE.Mesh(geometry, boxmaterial)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,4,2),normalmaterial)
sphere.scale.y = 1.2
const floor = new THREE.Mesh(new THREE.BoxGeometry(7,0.2,7),floormaterial)
floor.position.y = - 2
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5,0.3,64,100),spherematerial)
torus.position.x = -2
const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16),knotmaterial)
knot.position.y = 2

scene.add(box,sphere,floor,torus,knot)

//Lights
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5)
const pointlight = new THREE.PointLight(0xffffff, 1)
pointlight.position.y = 2
pointlight.position.z = 0
pointlight.position.x = -2
scene.add(ambientlight,pointlight)




// Sizes
const sizes = {
    width: window.innerWidth,
    height: innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // sphere.rotation.y +=0.01
    sphere.position.x = 2
    
    box.rotation.y = -cursor.x
    box.rotation.x = cursor.y

    torus.rotation.x += 0.01
    
    sphere.position.y = Math.sin(elapsedTime)/2

    knot.rotation.z += 0.02
    

    // camera.position.x = cursor.x*2
    // camera.position.y = cursor.y*2
    // camera.lookAt(mesh.position)
    
    // mesh.position.y = Math.sin(elapsedTime)
    // sphere.rotation.x = Math.sin(elapsedTime)
    sphere.rotation.y = Math.sin(elapsedTime) * Math.PI
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
    
}

tick()

//GUI
// const gui = new dat.GUI()

// gui
// .add(mesh.position, 'y')
// .min(-3)
// .max(3)
// .step(0.01)
// .name('position')
// gui
// .add(material, 'wireframe')

// const parameters = {color: 0xff0000}

// gui
// .addColor(parameters, 'color')
// .onChange(() =>
// {
// material.color.set(parameters.color)
// })