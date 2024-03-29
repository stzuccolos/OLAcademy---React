console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};


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

const getPassedUsersFirstVideoTitle = async (user) => {
  try {
    var emailObj = await loginUser(user, 1234);
    var videos = await getUserVideos(emailObj.userEmail);
    var title = await videoDetails(videos[0]);
    return title;
  } catch (err) {
    console.error(user + ': ' + err);
  }
};

getPassedUsersFirstVideoTitle("user1@hw.js");
getPassedUsersFirstVideoTitle("user2@hw.js");
getPassedUsersFirstVideoTitle("user3@hw.js");
getPassedUsersFirstVideoTitle("user4@hw.js");

console.log("Finish");
