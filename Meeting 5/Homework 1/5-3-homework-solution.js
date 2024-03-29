console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

function displayError(errorMessage) {
  console.error(new Error(errorMessage));
}

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Object.keys(usersDB).includes(email)) {
        reject("User not found!");
      }

      console.log(`Now we have the data of user: ${email}`);
      let emailObj = { userEmail: email };
      resolve(emailObj);
    }, 3000);
  });
}

function getUserVideos(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Object.values(usersDB[email]).length === 0) {
        reject("Videos not found!");
      }

      resolve(usersDB[email]);
    }, 2000);
  });
}

function videoDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Object.keys(video).includes("title")) {
        reject("Video Title not found!");
        return;
      }

      resolve(video.title);
    }, 2000);
  });
}

const getPassedUsersFirstVideoTitle = (user) => {
  return loginUser(user, 1234)
    .then((email) => {
      getUserVideos(email.userEmail)
        .then((videos) => {
          console.log(videos);
          videoDetails(videos[0])
            .then((title) => {
              console.log(title);
            })
            .catch((err) => {
              displayError(err);
            });
        })
        .catch((err) => {
          displayError(err);
        });
    })
    .catch((err) => {
      displayError(err);
    });
};

getPassedUsersFirstVideoTitle("user1@hw.js");

console.log("Finish");
