// SweetAlert
function reuseAlert(title, msg, icon, button) {
    Swal.fire (
        {
        title: title,
        text: msg,
        icon: icon,
        confirmButtonText: button
        }
    ) 
}

// reuseAlert('Modal title', 'This is a descriptive text', 'success', 'Call to action')


