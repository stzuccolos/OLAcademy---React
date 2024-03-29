console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

function displayError(errorMessage) {
  console.error(new Error(errorMessage));
}

function loginUser(email, password, onError, callback) {
  setTimeout(() => {
    if (!Object.keys(usersDB).includes(email)) {
      onError("User not found!");
      return;
    }

    console.log(`Now we have the data of user: ${email}`);
    let emailObj = { userEmail: email };
    callback(emailObj);
  }, 3000);
}

function getUserVideos(email, onError, callback) {
  setTimeout(() => {
    if (Object.values(usersDB[email]).length === 0) {
      onError("Videos not found!");
      return;
    }

    callback(usersDB[email]);
  }, 2000);
}

function videoDetails(video, onError, callback) {
  setTimeout(() => {
    if (!Object.keys(video).includes("title")) {
      onError("Video Title not found!");
      return;
    }

    callback(video.title);
  }, 2000);
}

const getPassedUsersFirstVideoTitle = (user) => {
  return loginUser(user, 1234, displayError, (loginResult) => {
    console.log(loginResult);
    getUserVideos(loginResult["userEmail"], displayError, (videosResult) => {
      console.log(videosResult);
      videoDetails(videosResult[0], displayError, (firstVideo) => {
        console.log(firstVideo);
      });
    });
  });
};

getPassedUsersFirstVideoTitle("user1@hw.js");

console.log("Finish");
