function sortImages() {
    const gallery = document.getElementById('imageGallery');
    const images = Array.from(gallery.getElementsByClassName('thumbnail'));
    const sortOption = document.getElementById('sortOptions').value;

    if (sortOption === 'recommended') {
        images.sort(() => Math.random() - 0.5); // Random order
    } else {
        images.sort((a, b) => {
            const aValue = parseInt(a.getAttribute(`data-${sortOption}`));
            const bValue = parseInt(b.getAttribute(`data-${sortOption}`));
            return bValue - aValue; // Descending order
        });
    }

    // Clear the gallery and append sorted images
    gallery.innerHTML = '';
    images.forEach(image => gallery.appendChild(image));

    // Apply grid layout dynamically
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    gallery.style.gap = '10px';
}

function showSuggestions(value) {
    const suggestions = document.getElementById('suggestions');
    const searchInput = value.toLowerCase();
    const gallery = document.getElementById('imageGallery');
    const images = Array.from(document.getElementsByClassName('thumbnail'));
    const titles = images.map(image => image.querySelector('.thumbnail-info h4').innerText.toLowerCase());
    suggestions.innerHTML = '';

    if (searchInput) {
        const filteredTitles = titles.filter(title => title.includes(searchInput));
        filteredTitles.forEach(title => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = title;
            suggestionItem.onclick = () => {
                document.getElementById('searchInput').value = title;
                suggestions.innerHTML = '';

                // Display only the selected image
                const matchedImage = images.find(image => image.querySelector('.thumbnail-info h4').innerText.toLowerCase() === title);
                
                // Clear the gallery and place the matched image at the beginning
                gallery.innerHTML = '';
                gallery.appendChild(matchedImage);

                // Apply grid layout dynamically
                gallery.style.display = 'grid';
                gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
                gallery.style.gap = '10px';
            };
            suggestions.appendChild(suggestionItem);
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail-img img');
    const modal = document.getElementById('popup-modal');
    const modalImg = document.getElementById('popup-img');
    const closeBtn = document.querySelector('.close-btn');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            modal.style.display = 'flex';
            modal.style.alignItems= 'center';
            modal.style.justifyContent= 'space-around';
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
