# Asset Ontrac

## Table of Contents

- [Description](#description)
- [User Roles and Permissions](#user-role-and-permissions)
- [Dependencies Used](#dependencies-used)
- [Installing a Dependency](#installing-a-dependency)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Functionality overview](#functionality-overview)

## Description

This is a device tracking and mangement software application where in a company can track a single device or a group of devices at once by setting the tracking interval frequency on the map. This map is also serves the purpose to manage the clients using the application along with the device users under the client.
The application has three different 

# User Roles and Permissions
## OntracAdmin (Super Admin)
- Has the permisions to manage both the Client Admins and the Client Users.

## ClientAdmin (Admin)
- Has the permisions only to manage clients users under the company.

## Client Users

- Only able to view the users performance stats and manage self account 

# Installation


## Dependencies Used

In a file named `package.json` at the root of your project:

```ruby
"dependencies": {
    "@mapbox/mapbox-gl-draw": "^1.2.0",
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.57",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "@turf/turf": "^5.1.6",
    "axios": "^0.21.0",
    "google-maps-react": "^2.0.6",
    "mapbox-gl": "^2.1.1",
    "mapbox-gl-draw-rectangle-mode": "^1.0.4",
    "material-table": "^1.69.0",
    "moment": "^2.29.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-lottie": "^1.2.3",
    "react-paystack": "^3.0.3",
    "react-redux": "^7.2.1",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.2.1"
  }
```

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```
npm install --save <library-name>
```

## Available Scripts

- Clone the repo in your terminal by clicking the _green_ clone or download button at the top right and copyin the url
- In your terminal, type ```git clone URL```
  - replace URL with the url you copied
  - hit enter
- This will copy all the files from this repo down to your computer
- In your terminal, cd into the directory you just created
- Type ```npm install``` to install all dependencies
- Last, but not least, type

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

- To look at the code, just open up the project in your favorite code editor!
-Local web server will use port 3000. You can configure port in scripts section of 

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## Functionality overview

**General functionality:**

-Once logged in the application has two views namely Admin View and Analyst view where in AdminView is basically used for user management and analyst view is a MapView used to view the tracked devices based on the filter parameters set.
-Super Admin will add client admins.
-These client admin can add devices along with the device details under Device Admin menu.
-These devices can be tracked by setting a tracking time frequency i.e, a minimum of 4 minutes.

**The general page breakdown looks like this:**

- Dashboard page (URL: /admin/dashboard )
    - Application Stats
    - Weekly/Monthly/Yearly Performance
- Sign in pages (URL: /#/ )
    - Contains two different logins
	-NOC Login(URL: /NOC): Gives all devices tracking info
	-Login(URL: /): General Login
- Users page (URL: /users)
	- Gives List of all users and permissions to manage them.
- Clients page (URL: /clients
	- Gives List of all clients and permissions to manage them.
	- Manage Users, devices, POIs, Zones and device groups under a selected client.
- Profile Page (URL: /profile)
	- Can edit the logged in user's profile and can also change password.
- Device Lists (/deviceLists)
	-Perform CRUD operations on devices.
	-Set tracking settings for any added device.
- List Device Types (/deviceTypes):
	- Has the list of types of tracking options i.e, GPS based, SIM based etc.
- Manage POIs (/pois):
	- Can manage POIs.
- Manage Zones (/zones):
	- Can manage Zones.
- Alerts (/viewAlerts):
	- Displays all the alerts in the application.

