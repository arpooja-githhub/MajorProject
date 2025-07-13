const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../Utils/wrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/Listing.js");
const { validatereview, isLoggedIn,isReviewAuthor  } = require("../middleware.js");
const reviewController = require("../controllers/review.js");
const review = require("../Models/review.js");



//Fixed Review Route (POST)
router.post("/",isLoggedIn, validatereview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;
