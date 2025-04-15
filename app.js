const express=require('express');
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
const app=express();                //instance is created of express
const College=require('./collegelistMongodb.js');
const SignupRouter=require('./routes/signup.js');
const signinRouter = require('./routes/signin.js');

app.use(express.static('collegesinfo'));     //specify which static files (images)  need to be used to display data on ui
app.use(bodyParser.urlencoded({extended:false}));  
app.use(bodyParser.json());
app.use('/signup',SignupRouter);
app.use('/signin',signinRouter);
app.set('view engine', 'ejs');

app.get(['/' ,'/home'], async (req, res) => {
  const perPage = 6; // Number of cards per page
  const page = parseInt(req.query.page) || 1; // Current page, defaults to 1

  try {
    const totalColleges = await College.countDocuments(); // Get total number of colleges
    const colleges = await College.find()
      .skip((perPage * page) - perPage) // Skip colleges for previous pages
      .limit(perPage); // Limit results to the number of cards per page

    res.render('index', {
      colleges,
      currentPage: page,
      totalPages: Math.ceil(totalColleges / perPage) // Calculate total pages
    });
  } catch (err) {
    res.status(500).send("Error fetching data");  // 500 is status code which means internal server error
  }
});



app.get('/university', async (req, res) => {
  const perPage = 6; // Number of cards per page
  const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
  const university_name = req.query.collegeName; // Capture university name from query

  try {
      // Check if university_name is provided
      const query = university_name ? {"affiliation.university": { $regex: university_name, $options: 'i' }} : {};  
      //regex(regular expression) is use for pattern matching even small part of input can be matched to data present in affiliation.university
      
      // Fetch colleges based on university name and paginate
      const colleges = await College.find(query)
          .skip((perPage * page) - perPage) // Skip colleges for previous pages
          .limit(perPage); // Limit results to the number of cards per page
      
      // Get total number of relevant colleges for pagination
      const totalColleges = await College.countDocuments(query); 

      res.render('university_vise', {
          colleges,
          currentPage: page,
          totalPages: Math.ceil(totalColleges / perPage), // Calculate total pages
          university_name // Pass university name to the view if needed
      });
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send("Error fetching data");
  }
});



app.get('/state', async (req, res) => {
  const perPage = 6;
  const page = parseInt(req.query.page) || 1;
  const stateName = req.query.stateName; // State name from the query
  const state = req.query.state; // Selected state

  try {
      // Initialize query as an empty object
      let query = {};

      // Only modify the query if stateName is provided
      if (stateName) {
         query = { "location.state": { $regex: stateName, $options: 'i' } };
      }

      // Fetch colleges based on the constructed query
      const colleges = await College.find(query)
          .skip((perPage * page) - perPage)
          .limit(perPage);

      // Get total count of colleges matching the query
      const totalColleges = await College.countDocuments(query);

      // Render the view with colleges and pagination information
      res.render('state_vise', {
          colleges,
          currentPage: page,
          totalPages: Math.ceil(totalColleges / perPage),
          state, // Pass the current state to the view
          stateName // Pass the state name to the view for display in the search input
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching data");
  }
});




app.get('/city', async (req, res) => {
  const perPage = 6; // Number of cards per page
  const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
  const cityName = req.query.cityName; // Capture city name from query

  try {
      // Construct the query based on city name if provided
      const query = cityName ? { "location.address": { $regex: cityName, $options: 'i' } } : {};
      
      // Fetch colleges based on city name and paginate
      const colleges = await College.find(query)
          .skip((perPage * page) - perPage) // Skip colleges for previous pages
          .limit(perPage); // Limit results to the number of cards per page
      
      // Get total number of relevant colleges for pagination
      const totalColleges = await College.countDocuments(query); 

      res.render('cityName', {
          colleges,
          currentPage: page,
          totalPages: Math.ceil(totalColleges / perPage), // Calculate total pages
          cityName // Pass city name to the view
      });
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send("Error fetching data");
  }
});



app.get('/college/:College_name', async (req, res) => {
  try {
       const college= await  College.findOne({ name:`${req.params.College_name}`});   
       
      if (college) {
          res.render('detailed_info', { college }); // Render a page with detailed info
      } else {
          res.status(404).send('College not found');
      }
  } catch (err) {
      res.status(500).send('Error fetching college details');
  }
});



const PORT=3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

