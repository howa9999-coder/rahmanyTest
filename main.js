                function toggleContent(button) {
                    const cont = button.closest('.cont');
                    const content = cont.querySelector('.content'); // Assuming your content is inside a div with class 'content'
                
                    if (content.style.display === 'none' || content.style.display === '') {
                        // Show the content
                        content.style.display = 'block';
                        button.innerText = '-';
                        cont.classList.add('expanded');
                    } else {
                        // Hide the content
                        content.style.display = 'none';
                        button.innerText = '+';
                        cont.classList.remove('expanded');
                    }
                }
                function btnFunction(param, btnClose){
                    const contact = document.querySelector(param);
                    const btn = document.querySelector(btnClose);
                    contact.style.display = 'block'
                    btn.innerHTML = "-"
                }
    

// Select all images in the slider
const images = document.querySelectorAll('.slider-image');

// Add click event listener to each image
images.forEach((image) => {
    image.addEventListener('click', () => {
        if (document.fullscreenElement) {
            // If already in fullscreen, exit fullscreen
            document.exitFullscreen();
        } else {
            // Otherwise, request fullscreen for the clicked image
            image.requestFullscreen().catch((err) => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        }
    });
});

// Optional: Handle fullscreen change events
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        console.log('Entered fullscreen mode');
    } else {
        console.log('Exited fullscreen mode');
    }
});