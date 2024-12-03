//js for cloudinary
document.getElementById("uploadWidget").addEventListener("click", function () {
    cloudinary.openUploadWidget(
      {
        cloudName: "dcg5aau7u", // Replace with your Cloudinary cloud name
        uploadPreset: "preset-cloudinary", // Replace with your unsigned preset
        folder: "profile_pics",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded Image URL:", result.info.secure_url);
  
          // Display the uploaded image
          const imgElement = document.getElementById("uploadedImage");
          imgElement.src = result.info.secure_url;
  
          // Save the URL to Firebase
          saveProfilePicture("generatedId", result.info.secure_url); // Replace "user123" with dynamic user ID
        }
      }
    );
  });
  //saving to firestore
  async function saveProfilePicture(userId, imageUrl) {
    const userDoc = doc(db, "users", userId); // Reference to the user's document
    try {
      await setDoc(userDoc, { profilePicture: imageUrl }, { merge: true });
      console.log("Profile picture URL saved to Firestore.");
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  }
//retriveurl
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

async function getProfilePicture(userId) {
  const userDoc = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("Profile Picture URL:", userData.profilePicture);

      // Display the image
      const imgElement = document.getElementById("uploadedImage");
      imgElement.src = userData.profilePicture;
    } else {
      console.log("No profile picture found!");
    }
  } catch (error) {
    console.error("Error retrieving profile picture:", error);
  }
}
//getdp  onpage load
window.onload = () => {
    getProfilePicture("user123"); // Replace "user123" with dynamic user ID
  };
  