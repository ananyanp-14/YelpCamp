
const mongoose=require('mongoose');
const Campground=require('../models/campground');
mongoose.set('strictQuery', true);
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++)
        {
            const random1000=Math.floor(Math.random()*1000);
            const price=Math.floor(Math.random()*20)+10;
            const camp=new Campground({
                author:'6685509452ef3ee9fd6e5a2b',
                location:`${cities[random1000].city},${cities[random1000].state}`,
                title:`${sample(descriptors)} ${sample(places)}`,
                description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada quam non arcu pharetra, id tincidunt libero fermentum. Mauris condimentum est vel sem fermentum, sit amet eleifend elit dictum. Vivamus posuere velit nec mi tincidunt, sed porttitor felis convallis. Phasellus sit amet sapien sit amet turpis convallis pellentesque ac ut odio. Nullam vehicula, nisi sed vestibulum congue, enim orci egestas sapien, eget sodales nisl libero nec elit. Nulla eu leo sit amet sapien pharetra placerat. Suspendisse potenti. Integer ultricies nulla vel neque pretium, eget consequat sem posuere.',
                price ,
                geometry:{
                    type:"Point",
                    coordinates:[
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                ]
                },
                images:  [
                    {
                      url: 'https://res.cloudinary.com/dlpaceabk/image/upload/v1720693212/YelpCamp/uhznzlwqtnj04syu49jz.png',
                      filename: 'YelpCamp/uhznzlwqtnj04syu49jz',
                    }
                  ]
            })
            await camp.save();
        }
}
seedDB().then(()=>{
 mongoose.connection.close();
});