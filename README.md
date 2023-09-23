# Set up project 

### Clone the project and install dependencies
- `git clone https://github.com/tricaisabel/reviews-app-be.git`
- `cd reviews-app-be`
- `npm install`

### Create a local .env file with the API keys
- Download the file provided by me (env.txt)
- Open it and copy the content.
- Create a new .env file in the root of the review-app-be directory and paste the content. Save.

### Start the back-end server
- `npm run dev`
- The message "Connected to MongoDB Atlas" should appear.
- This command will start the server on [http://localhost:8080](http://localhost:8080)
- Now, you can [start the front end application](https://github.com/tricaisabel/reviews-app-fe) in another instance

### Test using Postman
- Click the import button in Postman and select the reviews-app-postman-collection.json file (at the root of the reviews-app-be project)
- Try the imported requests and happy testing!

Note: To be able to send requests to companies you need to have a json web token provided by the login request
