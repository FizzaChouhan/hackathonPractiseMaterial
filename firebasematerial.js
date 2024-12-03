import {
    db,
    collection,
    addDoc,
    setDoc,
    doc,
    getDocs,
    deleteDoc,
    updateDoc,
    getAuth,
    serverTimestamp,
    onSnapshot,
    onAuthStateChanged,
    auth,
  } from "./firebase.js";
  //full code for post/and curd
  // Variable to store Firestore-generated document ID
  let generatedId;
  
  // Global variable to store the current authenticated user
  let user;
  
  // Listen for authentication state changes
  onAuthStateChanged(auth, (authUser) => {
    user = authUser; // Assign the current user globally once loaded
  });
  
  // Reference to input fields
  let postTitle = document.getElementById("postTitle");
  let content = document.getElementById("postContent");
  
  // Handle post creation
  let post = document.getElementById("post");
  post.addEventListener("click", async () => {
    try {
      // Show a loading SweetAlert
      Swal.fire({
        title: "Please wait...",
        text: "Posting your data...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });
  
      if (user) {
        // If a user is logged in, get their UID
        const uid = user.uid;
  
        // Data to save in Firestore
        let saveData = {
          postTitle: postTitle.value,
          content: content.value,
          uid: uid,
          time: new Date(),
        };
  
        // Add document to Firestore "posts" collection
        const docRef = await addDoc(collection(db, "posts"), saveData);
  
        // Close the loading SweetAlert and show success message
        Swal.close();
        Swal.fire("Success", "Post created successfully!", "success");
  
        // Store the generated document ID
        generatedId = docRef.id;
        console.log("Document written with ID: ", generatedId);
      } else {
        // If no user is authenticated, show an error
        Swal.fire("Error", "User not authenticated.", "error");
      }
    } catch (e) {
      // Handle errors and show an error SweetAlert
      Swal.close();
      Swal.fire("Error", "Failed to create post: " + e.message, "error");
    }
  
    // Display the newly created post
    let postDisplay = document.getElementById("postDisplay");
  
    // Add delete button for the post
    let delPost = document.createElement("button");
    delPost.setAttribute("id", "delpost");
    delPost.setAttribute(
      "class",
      "w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10"
    );
    delPost.textContent = "Delete Post";
    postDisplay.appendChild(delPost);
  
    // Add event listener for deleting the post
    delPost.addEventListener("click", async () => {
      try {
        if (user) {
          // If a user is logged in, delete the document using the stored document ID
          await deleteDoc(doc(db, "posts", generatedId));
          console.log("Document deleted with ID:", generatedId);
        } else {
          console.log("No user is signed in.");
        }
      } catch (e) {
        // Log any error during deletion
        console.error("Error deleting document:", e);
      }
      finally{
        // Remove the post display and delete button after deletion
        postDisplay.innerHTML = "";
      }
    });
  
    // Show the title and content of the post in the display area
    document.getElementById("displayTitle").innerText = postTitle.value;
    document.getElementById("displayContent").innerText = content.value;
  
    // Hide the post form and show the post display section
    document.getElementById("postForm").classList.add("hidden");
    document.getElementById("postDisplay").classList.remove("hidden");
  
    // Add a button to fetch and display all posts
    let getPosts = document.createElement("button");
    getPosts.setAttribute("id", "allpost");
    getPosts.setAttribute(
      "class",
      "w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10"
    );
    getPosts.textContent = "Get All Posts";
    postDisplay.appendChild(getPosts);
  
    // Add event listener to fetch and display all posts
    getPosts.addEventListener("click", async () => {
      try {
        // Fetch all posts from the "posts" collection
        const querySnapshot = await getDocs(collection(db, "posts"));
  
        // Clear the post display container before adding new posts
        let postsContainer = document.getElementById("postDisplay");
        postsContainer.innerHTML = "";
  
        // Iterate through the documents in the query snapshot
        querySnapshot.forEach((doc) => {
          let postData = doc.data(); // Data of the post
          let postElement = document.createElement("div"); // Create a container for the post
          postElement.classList = "bg-white shadow-lg rounded-lg p-6 mb-4";
  
          // Add post data to the post container
          postElement.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">${postData.postTitle}</h2>
            <p class="text-gray-700 mb-4">${postData.content}</p>
            <span class="text-gray-500 text-sm">Post ID: ${doc.id}</span>
          `;
  
          // Append the post container to the display area
          postsContainer.appendChild(postElement);
        });
      } catch (e) {
        // Log any error during fetching posts
        console.error("Error fetching posts: ", e);
      }
    });
   // Create an "Update Post" button
  let updatePost = document.createElement("button");
  updatePost.setAttribute("id", "updatepost");
  updatePost.setAttribute(
    "class",
    "w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10"
  );
  updatePost.textContent = "Update Post";
  postDisplay.appendChild(updatePost);
  
  // Add click event listener for the "Update Post" button
  updatePost.addEventListener("click", async () => {
    try {
      if (!generatedId) {
        console.log("No post ID found to update.");
        Swal.fire("Error", "No post selected for updating.", "error");
        return;
      }
  
      // Display an input form to get the new title and content from the user
      const { value: formValues } = await Swal.fire({
        title: "Update Post",
        html:
          '<input id="updateTitle" class="swal2-input" placeholder="Enter new title">' +
          '<textarea id="updateContent" class="swal2-input" placeholder="Enter new content"></textarea>',
        focusConfirm: false,
        preConfirm: () => {
          return {
            title: document.getElementById("updateTitle").value,
            content: document.getElementById("updateContent").value,
          };
        },
      });
  
      if (!formValues || !formValues.title || !formValues.content) {
        Swal.fire("Error", "Both title and content are required to update.", "error");
        return;
      }
  
      // Reference to the Firestore document for the post
      const docRef = doc(db, "posts", generatedId);
  
      // Update the document in Firestore
      await updateDoc(docRef, {
        postTitle: formValues.title,
        content: formValues.content,
        updatedAt: new Date(), // Optional: Timestamp for tracking updates
      });
  
      // Show success message
      Swal.fire("Success", "Post updated successfully!", "success");
  
      // Update the display with the new post content
      document.getElementById("displayTitle").innerText = formValues.title;
      document.getElementById("displayContent").innerText = formValues.content;
  
      console.log("Document updated with ID:", generatedId);
    } catch (error) {
      console.error("Error updating document:", error);
      Swal.fire("Error", "Failed to update post: " + error.message, "error");
    }
  });
  })


//CURD
  //toadd data{create}
  async function createData() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //Read (Retrieve Data)
  async function readData() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
      });
    } catch (e) {
      console.error("Error reading documents: ", e);
    }
  }

  //Update (Modify Existing Data)
  async function updateData(docId) {
    try {
      const docRef = doc(db, "users", docId);
      await updateDoc(docRef, {
        age: 35 // Updating age to 35
      });
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  //Delete (Remove Data)
  async function deleteData(docId) {
    try {
      const docRef = doc(db, "users", docId);
      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  //docRef
  const docRef = doc(db, "collectionName", "documentId");

  //for generatedid
  import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

async function createDocWithAutoId() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Auto User",
      email: "auto@example.com",
      age: 22
    });
    console.log("Document created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

  //timestamp
  import { Timestamp, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

async function addDocumentWithTimestamp() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      createdAt: Timestamp.now() // Stores the current timestamp
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


  