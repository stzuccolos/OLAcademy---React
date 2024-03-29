console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

function loginUser(email, password, callback) {
  setTimeout(() => {
    console.log(`Now we have the data of user: ${email}`);

    let emailObj = { userEmail: email };
    callback(emailObj);
  }, 3000);
}

function getUserVideos(email, callback) {
  setTimeout(callback, 2000, usersDB[email]);
}

function videoDetails(video, callback) {
  setTimeout(callback, 2000, video.title);
}

const getPassedUsersFirstVideoTitle = (user) => {
  return loginUser(user, 1234, (loginResult) => {
    console.log(loginResult);
    getUserVideos(loginResult["userEmail"], (videosResult) => {
      console.log(videosResult);
      videoDetails(videosResult[0], (firstVideo) => {
        console.log(firstVideo);
      });
    });
  });
};


getPassedUsersFirstVideoTitle("user1@hw.js");

console.log("Finish");
