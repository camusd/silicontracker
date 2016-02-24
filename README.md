# Silicon Tracker
Current Implementation: http://silicontracker.xyz

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
process.env.DB_HOST			= 'localhost';
process.env.DB_USER			= 'tracker_user'; 
process.env.DB_PASSWORD		= 'your_own_password_here';
process.env.DB 				= 'tracker';

process.env.APP_IP 			= '127.0.0.1';
process.env.APP_PORT 		= 8080;
```

## Database Script
There are a few things that need to be done in order to get the database up and running. Our project is running on a MySql database. You will need MySql on your local machine or server. There are three things needed to get the database up and running:
* Creating the database
* Creating a user for the database
* Populating the database

All of the database scripts we use are in the dbscripts folder. In a terminal window, navigate to that folder and login to your MySql client as root or as someone with sufficient privileges. `mysql -u root -p`

After logging in, the first step is to create the database: `mysql> CREATE DATABASE tracker;`
We called the database 'tracker' but you can rename it if you like. Just remember what you decided to call it.

Once the database is created, we need a user with the right priviliges to be in charge of the database.

`mysql> CREATE USER 'tracker_user'@'localhost' IDENTIFIED BY 'SomePassword';`

You can change the name of the user if you like, but just remember what you named it.

We will need to add a few permissions to our new user. It needs to select, update, and insert into the tables as well as execute stored procedures. This user will never be deleting rows, so it doesn't get that privilege.

```
mysql> GRANT SELECT ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT INSERT ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT UPDATE ON tracker.* TO 'tracker_user'@'localhost';
mysql> GRANT EXECUTE ON tracker.* TO 'tracker_user'@'localhost';

mysql> FLUSH PRIVILEGES;
```

We now have a user!

Last but not least, we have to populate our newly-created database. The create scripts for the tables and stored procedures, as well as insert scripts for our sample data are in the script `tracker.sql` located in the `dbscripts` folder. We will be executing this script: `mysql> \. tracker.sql;`

At this point, we should have our database completely set up!

## The Server
Our project is running on a Node.js server. If you haven't already, go download Node.js from their website: https://nodejs.org

It doesn't matter if you get the stable or the bleeding-edge version. Our app should work on both.

Navigate back to the root folder and in the terminal type `npm install`. This will install any dependencies our program depends on. We use npm for all our packages. It comes installed with Node.js. For more information on npm, visit their website: https://www.npmjs.com/

After setting up the server and downloading the dependencies, you should be able to start it up with `npm start`. You should be greeted with a message: `Silicon Tracker Server listening at <ip address>:<port>` In your broswer, navigate to that ip address. Don't forget the port! At this point you should be greeted with the Silicon Tracker website. Congratulations!
