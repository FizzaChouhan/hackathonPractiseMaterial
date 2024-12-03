//cdn for sweet alert
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
//input field
Swal.fire({
    title: 'Enter your name',
    input: 'text',
    inputPlaceholder: 'Your name here',
    showCancelButton: true
  }).then((result) => {
    if (result.value) {
      Swal.fire(`Hello, ${result.value}!`);
    }
  });
//confirmation
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  });
//error
function showError() {
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33',
      background: '#fff',
      color: '#d33'
    });
  }
  //forloader
  function showLoader() {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false, // Prevents closing the popup when clicking outside
      didOpen: () => {
        Swal.showLoading(); // Displays the loading spinner
      }
    });

    // Simulate a delay (e.g., data loading or API call)
    setTimeout(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Your request has been completed.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, 3000); // 3 seconds
  }