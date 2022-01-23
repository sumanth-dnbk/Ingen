# Ingen 


### About 
This is a javascript physics simulation engine. I have created this to explore various real world simulations and gain insights on workings of various simulations engines. 

 The current state of this simulation engine can model forces like gravity, materials like strings(using these as building blocks other objects can be created), rotation based on the angular momentum of the bodies, and boundary collision detection.

### Project Structure
I have used HTML canvas for the display and Javascript for the simulation logic. The core logic of the engine is present in particle.js(It is well commented feel free to explore). All the calculations required for simulations are vector-based so as to provide better readability and maintain similarity to other physics engines. 

### Usage
Each animation is separated to a different javascript file. In the index.html the similation engine logic is loaded first and then you can load the file containing the required simulation. 

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
