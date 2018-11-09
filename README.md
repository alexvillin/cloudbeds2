# cloudbeds 2

Watch https://alexvillin.github.io/cloudbeds2/#/

Algorytm draws container with screen dimentions and 8 containers around filled by spiral from right top
When user scrolls it, new containers are added old ones are deleted
Use control matrix for container existing checking
Use Vue, Vuex

## Main Components:
- Container: contain boxes depends on screen sizes, one box = 100x100px
```html
  <Container :indexX="x" :indexY="y" />
```
```
    Container component
    Props: 
        indexX: Number; //current scroll position index x asix
        indexY: Number; //current scroll position index y asix
```
- Box
```html
  <Box :index="i" :containerIndex="j" :containerData="vuex.state.data"/>
```
```
  Props: 
    index: String; //unique box id in the scope of container
    containerIndex: String; //unique container id
    containerData: Object; //pass data for increase vuex calls (optional)
  ```
- Ruler
```html
   <Ruler :amount="counter" position="top" step="100" />
```
```
  Props: 
     position: String; //['top', 'left']
     step: Number; // in pixels ruler step (optionsl)
     amount: Number; //amount of blocks in parent scope
 ```
 ### Project setup
 
 ```
 git clone https://github.com/alexvillin/cloudbeds2.git
cd ./cloudbeds2
npm install
npm run serve
 ```

## Task

We have a grid 40000x40000 with cells that contain checkbox and input fields. A user should see a limited number of cells (as many as screen size allows) and have the ability to scroll visible rectangle area to any point of the grid to see data at that point.

  -  Data should be loaded dynamically (emulate that with a method that generates data with a delay of 0.5 sec)
  -  If a checkbox is selected, it should disable input field.
  -  Input field should allow only digits to be typed.
  -  When you change checkbox or input fields, save button should appear. When a user clicks on it, all modified data should appear in the console
  -  Should have rulers at the top and left to identify cell coordinates

## Requirements:

 -   Vue + Vuex
 -   User should see the result as soon as possible after scrolling
 -   Code must be well documented
 -   Pure HTML/CSS (Bootstrap, etc are prohibited)
 -   No performance issues and smooth interaction
 -   Application must be allocated on Github (please provide the link)
    (optional, as a bonus) Covered by tests (you can choose instruments by yourself)
    (will be helpful) To speedup the feedback process please host the solution somewhere and provide the link
