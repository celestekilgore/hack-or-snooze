"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
  $favStoriesContainer.hide();
  $allFavoriteStoriesList.hide();

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();

}

$navLogin.on("click", navLoginClick);



/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $loginForm.hide();
  $signupForm.hide();
  $navLogin.hide();
  $navLogOut.show();
  $linkToStorySubmit.show();
  $navLinkToFavs.show();
  $favStoriesContainer.hide();


  $navUserProfile.text(`${currentUser.username}`).show();
}

/**
 * when a user clicks the submit link, show the new story submit form
 */
function navSubmitNewStoryClick(evt) {
  console.debug('navSubmitNewStoryClick', evt);

  $newStorySubmitForm.show();
}

$linkToStorySubmit.on('click', navSubmitNewStoryClick);
