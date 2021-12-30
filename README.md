# Ingen 


### About 
This is a physics simulation engine. The current state of this simulation engine can model forces like gravity, materials like strings(using these as building blocks other objects can be created), rotation based on the angular momentum of the bodies, and boundary collision detection.

Particle is the basic building block in this engine(particle.js) and all the calculations are vector-based to provide readability and faster computation.This library has been built using HTML and javascript without using any external libraries. The animations are displayed on the HTML canvas element. Particle, Vector, and Utils files contain the core logic of the engine, so these files are imported first in the index.js and our simulation file goes last.

 ### Simulations

- Cloth simulation

<img src="https://user-images.githubusercontent.com/22196360/147784639-dad5569c-0dd0-45ee-bfbc-fbab1cc9c611.gif" width='300' height='300' />


- A free falling object with rotation.

<img src="https://user-images.githubusercontent.com/22196360/147784653-5dda3d92-87c3-4fe0-a795-66d22bd4d720.gif" width='300' height='300' />

- Planetary simulation
 
 <img src="https://user-images.githubusercontent.com/22196360/147784652-1dcf9cb1-75a9-4d4a-b5b2-453073179548.gif" width='300' height='300' />
  
  The object at the center has large gravitational pull and the other objects are initalized with a velocity. The centrifugal force and gravity keep each other balanced.
  
- Multiple gravitational pulls on objects in motion

<img src="https://user-images.githubusercontent.com/22196360/147784650-c9b967f9-6d1b-4de7-8adb-962dee94670d.gif" width='300' height='300' />
