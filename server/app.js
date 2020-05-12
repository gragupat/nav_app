// Import all dependencies & middleware here
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { 
    navController
} from './controller';
import compression from 'compression';
import helmet from 'helmet';

// Init an Express App. This later starts a server and put all dependencies into your project to use
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

// use all controllers(APIs) here
app.use('/', navController);

// Start Anything here
const apiPort = process.env.PORT || 3000;
app.listen(apiPort, () => {
   console.log('Nav app listening on port ' + apiPort);
   mongoose.connect('mongodb://localhost/navs').then(() => {
    console.log(`Conneted to mongoDB at port 27017`);
 });
});