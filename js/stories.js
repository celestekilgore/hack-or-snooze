"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="bi bi-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** when a user submits the new story form, put that new story on the page */
async function submitNewStory(evt) {
  evt.preventDefault();
  console.debug('submitNewStory');

  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();

  const story = await storyList.addStory(currentUser, { author, title, url });

  const $storyHtml = generateStoryMarkup(story);
  $allStoriesList.prepend($storyHtml);
  $newStorySubmitForm.trigger("reset");
  $newStorySubmitForm.hide();
}

$newStorySubmitForm.on('submit', submitNewStory);

/**
 *
 */

function putFavoriteStoriesOnPage() {

  console.debug("putFavoriteStoriesOnPage");

  $allStoriesList.hide();

  $allFavoriteStoriesList.empty();

  if (currentUser.favorites.length === 0) {
    $allFavoriteStoriesList.append('<p>No favorite added!</p>');
  } else {
    for (let story of currentUser.favorites) {

      const $favStory = generateStoryMarkup(story);
      console.log('child:', $favStory.first().removeClass('bi bi-star').addClass('bi-star-fill'));
      // console.log($favStory.html());
      $allFavoriteStoriesList.append($favStory);
      $favStoriesContainer.append($allFavoriteStoriesList);

    }
  }
  // console.log('value we check:', $allFavoriteStoriesList.html());
  $allFavoriteStoriesList.show();
  $favStoriesContainer.show();
}

$navLinkToFavs.on('click', putFavoriteStoriesOnPage);
