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

### 3 - Recipe Filters
- add search bar component 
- is signal a better way to implement user search input ? (to discuss)
  (3 hours)
- add category services and category filter component
