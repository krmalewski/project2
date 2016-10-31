# Travel Buddy

## Summary
This app makes planning your next trip a breeze! Simply decide on a destination, and the app will offer popular tourist attractions that you can add to your _Bucket List_. Once you have a full _Bucket List_, you can view a map with markers on all the places you want to visit!

![log in page](/public/images/profile.png)

## User Story

As a user
* you can select a city to explore on your profile page
* search for attractions/places in the city that you chose
* add/remove attractions to and from your _Bucket List_
* edit descriptions of places saved to your _Bucket List_
* view current weather conditions in the city that you chose
* view a list with information including rating, reviews, address, phone number, and a link to more Yelp reviews of places saved to your _Bucket List_
* view a Google Map of the city that you chose with markers on all the locations that have been saved to your _Bucket List_

## Use Case
User will start by searching for a city that they are interested in visiting. The results will populate a list of popular tourist attractions with information including rating, reviews, address, phone number, and a link to more Yelp reviews. 

From here, the user can add items to their _Bucket List_. If they are interested in visiting somewhere that is not listed within the initial search results, they can search for a specific attraction or conduct a general search such as "pizza". 

While building their _Bucket List_, the user can also remove items as well as edit the descriptions/add comments about each attraction. 

Once the user is happy with their _Bucket List_, they can "**See my trip!**" This will take them to a new page that has all their _Bucket List_ items listed out with information including the comments that they added. This page will also include a Google Map with markers at the location of all the places saved to their _Bucket List_. 

## Approach 
1. Set up MVC
2. Set up server
3. Set up the routes
4. Read API Documentation 
5. Make the models/services
6. Implement User Auth
7. Styling

## Wireframe

Register/Log In 

![login page](/public/images/login-wireframe.png)

Search Results 

![search results page](/public/images/explore-wireframe.png)

Trip Plan

![trip plan page](/public/images/map-wireframe.png)

## Technologies Used 

* API's 
    * [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)
    * [Yelp API](https://www.yelp.com/developers/documentation/v2/overview)
    * [Open Weather API](https://openweathermap.org/api)
* Express
* Node
* MongoDB


## Sources 
1. This [site](https://arian.io/how-to-use-yelps-api-with-node/) was helpful with getting the secure authorization protocol (OAuth 1.0a, xAuth) to work through the Yelp API.
2. This [site](https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/) was useful when trying to render multiple markers on my Google Map.
3. The [user_auth_itunes](https://git.generalassemb.ly/wdi-nyc-60/user_auth_itunes) was referenced. 
4. The [tom-cruise-movie-db](https://git.generalassemb.ly/wdi-nyc-60/tom-cruise-movie-db) was refernced for the "PUT" request.
5. The [itunes-crud-lab](https://git.generalassemb.ly/wdi-nyc-60/itunes_crud_lab) was refereced for "GET", "POST", and "DELETE" requests. 
6. The [open_weather_search_solution](https://git.generalassemb.ly/wdi-nyc-60/open_weather_search_solution) was referenced when working with the Open Weather API.

## Hurdles 
1. The Yelp API required OAuth.
2. Google Maps was challenging because all the maps are created from constructors within the API library so this API has to be used on the front end.
3. Passing the city that the user selected on their profile page between all the different pages.
4. Passing Google Places autocorrect results to the Yelp API fetch. 

