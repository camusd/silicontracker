# Silicon Tracker

This is the Senior Capstone project of Brett Hayes (@bretterism), Dylan Camus (@camusd), and Joseph Cronise (@cronisej).
It is a web interface for tracking CPU silicon and other items used within the PMA labs at Intel.

## Interfaces
There are two main interfaces to the app.
* The web interface
* The kiosk interface
The web interface can be found at the base url. To use the kiosk interface you must navigate to the /kiosk page.
For example: the kiosk interface looks like: silicontracker.xyz/kiosk

## Environment Variables
The node.js app uses environment variables, and they are not included on the repo (no need for the world to know my passwords). In order to make the environment variables work, you must create a new file in the root directory called `env.js`.

The file should look like the following, with your own settings to replace the ones here:
```

// dev  = development environment
// prod = production environment - needs to use https! 
process.env.ENV				= 'dev';

// Database variables
process.env.DB_HOST			= 'localhost';
process.env.DB_USER			= 'tracker_user'; 
process.env.DB_PASSWORD		= 'your_own_password_here';
process.env.DB 				= 'tracker';

// Server app variables
process.env.APP_IP 			= '127.0.0.1';
process.env.APP_PORT 		= 8080;
process.env.SSL_PASSPHRASE	= 'myLittleSecret';

// Credential server variables
process.env.CRED_PORT		= 8082;
process.env.CRED_ADDR		= 'http://localhost:' + process.env.CRED_PORT;

// Session secret
process.env.SESSION_SECRET	= 'iamasecret';

// Email variables
process.env.EMAIL_USER = 'test@gmail.com';
process.env.EMAIL_PASSWORD = 'test123';
```

## Database Script
There are a few things that need to be done in order to get the database up and running. Our project is running on a MySql database. You will need MySql on your local machine or server. There are three things needed to get the database up and running:
* Creating the database
* Creating a user for the database
* Populating the database

All of the database scripts we use are in the dbscripts folder. In a terminal window, navigate to that folder and login to your MySql client as root or as someone with sufficient privileges. `mysql -u root -p`

After logging in, the first step is to create the database: `mysql> CREATE DATABASE tracker;`
We called the database 'tracker' but you can rename it if you like. Just remember what you decided to call it. After creating, make sure to select the right database: `mysql> USE tracker;`

Once the database is created, we need a user with the right priviliges to be in charge of the database.

`mysql> CREATE USER 'tracker_user'@'localhost' IDENTIFIED BY 'SomePassword';`

You can change the name of the user if you like, but just remember what you named it.

Next, we have to populate our newly-created database. The create scripts for the tables and stored procedures, as well as insert scripts for our sample data are in the script `tracker.sql` located in the `dbscripts` folder. We will be executing this script: `mysql> \. tracker.sql;`

We will need to add a few permissions to our new user. It needs to select, update, and insert into the tables as well as execute stored procedures. This user will never be deleting rows, so it doesn't get that privilege.

```
mysql> GRANT SELECT ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT INSERT ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT UPDATE ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT EXECUTE ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT DELETE ON tracker.Checkout TO 'tracker_user'@'localhost';

mysql> FLUSH PRIVILEGES;
```

We now have a user!

At this point, we should have our database completely set up!

## The Server
Our project is running on a Node.js server. If you haven't already, go download Node.js from their website: https://nodejs.org
There is also a bash script in the root directory to easily download and install node. Look for nodeinstall.sh. The latest version of Node should be fine.

It doesn't matter if you get the stable or the bleeding-edge version. Our app should work on both.

Navigate back to the root folder and in the terminal type `npm install`. This will install any dependencies our program depends on. We use npm for all our packages. It comes installed with Node.js. For more information on npm, visit their website: https://www.npmjs.com/

The main server code can be viewed in `app.js`. This is the file that calls environment variables, sets up the database connections, maps the routes, etc.

We also have a second app that we have created to mock the credential login system at Intel. It's a very simplified version of their credential system (It's not actually how Intel deals with security. Our code is more of a placeholder). You will need to run this app if you plan on logging in as a user. open up a separate terminal window and go to the `cred/` folder. There you will see a single file `cred.js`. Run this app with `node cred.js`.

After setting up the server and downloading the dependencies, you should be able to start it up with `npm start`. Make sure you are in the root folder for the project before you run that command. You should be greeted with a message: `Silicon Tracker Server listening at <ip address>:<port>` In your broswer, navigate to that ip address. Don't forget the port! At this point you should be greeted with the Silicon Tracker website. Congratulations!

## Facial Recognition
Facial recognition is done using OpenBR which needs to be installed on the sever prior to facial recognition working. The instructions to do so are at the bottom of this section.

Reference images are taken on the web interface, click your username in the top right and click setup facial recognition. At this screen center yourself in the frame and look directly at the camera with your eyes open and click save image. this will save your color and depth image as encoded strings and store them on the database. At the kiosk login page select your name from the table, center yourself in relation to the camera and look directly at it with your eyes open and click login. If this fails it is possible that your reference images were not good enough or you were looking down/had your eyes closed. (NOTE: Extra users in the frame, especially if they are visible to the depth camera, will cause the system to not recognize you.)

OpenBR installation instructions:

from the server follow these commands - more information can be found at http://openbiometrics.org/

-INSTALL GCC4.9.2-
'sudo apt-get update'
'sudo apt-get install build-essential'

-INSTALL CMAKE3.0.2-
'sudo apt-get install cmake cmake-curses-gui'


-DOWNLOAD AND INSTALL OPENCV2.4.11-
download OpenCV 2.4.11 from https://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.11/opencv-2.4.11.zip/download

'unzip opencv-2.4.11.zip'
'cd opencv-2.4.11'
'mkdir build'
'cd build'
'cmake -DCMAKE_BUILD_TYPE=Release ..'
'make -j4' NOTE: for faster install use more threads
'sudo make install'
'cd ../..'
'rm -rf opencv-2.4.11*'

-INSTALL QT5.4.1-
'sudo apt-get install qt5-default libqt5svg5-dev qtcreator'


-GET OPENBR-
'git clone https://github.com/biometrics/openbr.git'
'cd openbr'
'git checkout v1.1.0'
'git submodule init'
'git submodule update'

-BUILD OPENBR-
'mkdir build'
'cd build'
'cmake -DCMAKE_BUILD_TYPE=Release ..'
'make -j4' NOTE: for faster install use more threads
'sudo make install'

At this point you need to open the Qt Creator IDE using the command
'qtcreator &' NOTE: this requires a gui interface to be installed on the server. this is NOT a command line utility, however once OpenBR is installed the gui is no longer required.

-From the Qt Creator "File" menu select "Open File or Project...".
-From the Qt Creator "File" menu select "Open File or Project...".
-Browse to your pre-existing build directory "openbr/build" then select "Next".
-Select "Run CMake" then "Finish".

OpenBR should now be installed on the server and facial recognition should be functional.





