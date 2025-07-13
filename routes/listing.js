const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Listing = require("../Models/Listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
// const upload = multer({dest:'uploads/'});

router.route("/")
      .get(wrapAsync(listingController.index)) // Index Route
      .post(isLoggedIn, 
        upload.single('listing[image]'),
         validateListing,
         wrapAsync(listingController.createListing));// Create Route
       
       
//  New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Search Route




router.route("/:id")
      .get( wrapAsync(listingController.showListing)) // Show Route
      .put(isLoggedIn,
            isOwner, 
            upload.single('listing[image]'),
          validateListing, wrapAsync(listingController.updateForm))   //  Update Route
      .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));  //  Delete Route

     

//  Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
