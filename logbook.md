# Logbook

## Structure
- core: services, models, guards,...
- feature: folders structure organized by page

## Design
- use of tailwindcss only for utility classes to produce responsive design faster
- browse canva.com for inspiration and design ideas
- app is designed mobile first

## Improvement
- divide app.routes in subfolders for better organization
- add animation
- Error management
- Unit test
- enhance design


## Steps
### 0 - setup
- create new project using angular cli
- use of angular schematics for all project generation

### 1 - Recipes list
- add service to fetch recipes and view type
- create model accordingly
- add component to display recipes
- create service to count ingredients
- add tailwind to for faster design implementation
- start with basic layout and styling

### 2 - Recipe details
- add service to fetch recipe details view type
- create model accordingly
- add component to display recipe details and route
- use signal for error display
- refactor service to format ingredients
- browse canva.com for inspiration and design ideas
- light styling
- add all required information

### 3 - Recipe filters
- add search bar component 
- is signal a better way to implement user search input ? (to discuss)
  (3 hours)
- add svg icon from heroicons
- add category services and category filter component
- clear filter implementation 

### 4 - Favorite and To Do buttons
- add localStorage services
- create favorite list and to do list subjects
- add favorite button to details page
- add to do button to details page
- add favorite and to do logic

### 5 - Design
- apply light design
- style details page for mobile
- style details page for desktop
- style home for mobile
- style home for desktop

### 6 - Fix
- fix init of details page with favorite and todo
- fix conditional css class on details page
