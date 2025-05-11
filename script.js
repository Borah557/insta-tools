document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('instaUsername');
    const fetchButton = document.getElementById('fetchInstaData');
    const previewArea = document.getElementById('id-card-preview-area');
    const templateOptionsContainer = document.querySelector('.template-options');
    const downloadButton = document.getElementById('downloadCardBtn');

    let selectedTemplateId = 'template1'; // Default template
    let currentInstaData = null;

    // Mock Instagram Data
    const mockInstagramData = {
        "johndoe": {
            username: "johndoe",
            full_name: "John Doe",
            profile_pic_url: "https://i.pravatar.cc/150?u=johndoe", // Placeholder image
            bio: "Lover of coffee, code, and creative pursuits. Exploring the world one pixel at a time. 🌍✨ #TechLife",
            followers: 1250,
            following: 300,
            posts: 150,
            is_verified: true
        },
        "janedoe": {
            username: "janedoe",
            full_name: "Jane Doe",
            profile_pic_url: "https://i.pravatar.cc/150?u=janedoe", // Placeholder image
            bio: "Art, travel, and good vibes only. Sharing my journey and inspirations. 🎨✈️😊",
            followers: 5600,
            following: 500,
            posts: 320,
            is_verified: false
        },
        "instagram": {
            username: "instagram",
            full_name: "Instagram",
            profile_pic_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png",
            bio: "Bringing you closer to the people and things you love. ❤️ #Instagram",
            followers: 650000000,
            following: 80,
            posts: 7500,
            is_verified: true
        }
    };

    // Handle Template Selection
    templateOptionsContainer.addEventListener('click', (e) => {
        const targetOption = e.target.closest('.template-option');
        if (targetOption) {
            document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('selected'));
            targetOption.classList.add('selected');
            selectedTemplateId = targetOption.dataset.templateId;
            if (currentInstaData) {
                renderPreview(currentInstaData);
            }
        }
    });

    // "Fetch" Data and Generate Preview
    fetchButton.addEventListener('click', () => {
        const username = usernameInput.value.trim().toLowerCase();
        if (!username) {
            previewArea.innerHTML = '<p style="color:red;">Please enter a username.</p>';
            downloadButton.style.display = 'none';
            currentInstaData = null;
            return;
        }

        // Simulate fetching data
        previewArea.innerHTML = '<p>Fetching data (simulated)...</p>';
        setTimeout(() => { // Simulate network delay
            currentInstaData = mockInstagramData[username] || mockInstagramData["johndoe"]; // Fallback to johndoe if not found

            if (currentInstaData) {
                renderPreview(currentInstaData);
                downloadButton.style.display = 'block';
            } else {
                previewArea.innerHTML = `<p style="color:red;">Mock data for "${username}" not found. Showing default.</p>`;
                currentInstaData = mockInstagramData["johndoe"]; // show a default
                renderPreview(currentInstaData);
                downloadButton.style.display = 'block';
            }
        }, 500);
    });

    function sanitize(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function renderPreview(data) {
        const profilePicUrl = data.profile_pic_url || 'https://via.placeholder.com/90'; // Fallback PFP
        const name = sanitize(data.full_name) || 'N/A';
        const username = `@${sanitize(data.username)}` || 'N/A';
        const bio = sanitize(data.bio) || 'No bio available.';
        const posts = data.posts !== undefined ? data.posts.toLocaleString() : 'N/A';
        const followers = data.followers !== undefined ? data.followers.toLocaleString() : 'N/A';
        const following = data.following !== undefined ? data.following.toLocaleString() : 'N/A';

        const verifiedBadgeSVG = `<svg class="verified-badge" aria-label="Verified" fill="currentColor" height="24" role="img" viewBox="0 0 40 40" width="24"><polygon fill="none" points="20 39 12 39 12 21 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill="none" points="28 39 20 39 20 21 28 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill="none" points="39 20 39 12 21 12 21 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill="none" points="39 28 39 20 21 20 21 28" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><path d="M12 1H3C1.5 1 1 1.5 1 3V12S1 20 12 20S20 12 20 12S20 1 12 1Z" fill="#0095f6" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px"></path><polyline fill="none" points="30.5 6.5 11.5 25.5 4.5 18.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="3px"></polyline></svg>`;
        const verifiedBadgeHTML = data.is_verified ? verifiedBadgeSVG : '';

        // Instagram Logo (optional, you can use an actual SVG or image URL)
        const instaLogoSVG = `<svg class="insta-logo" viewBox="0 0 1024 1024" fill="white"><path d="M512 192c-176.5 0-320 143.5-320 320s143.5 320 320 320 320-143.5 320-320-143.5-320-320-320zm0 576c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.8 256-256 256z"></path><path d="M512 320c-106 0-192 86-192 192s86 192 192 192 192-86 192-192-86-192-192-192zm0 320c-70.7 0-128-57.3-128-128s57.3-128 128-128 128 57.3 128 128-57.3 128-128 128z"></path><path d="M688 288c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg>`;


        let templateHtml = `
            <div class="id-card ${selectedTemplateId}">
                ${ (selectedTemplateId === 'template1' || selectedTemplateId === 'template3') ? instaLogoSVG : '' /* Show logo on specific templates */}
                <div class="card-content">
                    <div class="profile-pic-container">
                        <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic" crossorigin="anonymous">
                    </div>
                    <div class="info">
                        <div class="name">${name} ${verifiedBadgeHTML}</div>
                        <div class="username">${username}</div>
                        <div class="bio">${bio}</div>
                        <div class="stats">
                            <span><span class="count">${posts}</span> Posts</span>
                            <span><span class="count">${followers}</span> Followers</span>
                            <span><span class="count">${following}</span> Following</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        previewArea.innerHTML = templateHtml;
    }

    // Download Functionality
    downloadButton.addEventListener('click', () => {
        const cardElement = previewArea.querySelector('.id-card');
        if (!cardElement || !currentInstaData) {
            alert("Please generate an ID card first.");
            return;
        }

        // Temporarily upscale for better quality if needed, then scale down image.
        // For simplicity, we'll use default resolution here.
        // You might want to set explicit width/height on html2canvas options for consistent output.
        html2canvas(cardElement, {
            useCORS: true, // Important for external images (like our pravatar/wikimedia pfp)
            allowTaint: true, // Allow tainting canvas for cross-origin images if useCORS fails
            backgroundColor: null, // Use element's background
            logging: true,
            onclone: (document) => {
                // This is important if you use external stylesheets or web fonts
                // that html2canvas might not pick up automatically.
                // For this demo, our styles are simple enough.
            }
        }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `${currentInstaData.username || 'instagram'}_id_card.png`;
            link.href = image;
            link.click();
        }).catch(err => {
            console.error("Error generating image with html2canvas:", err);
            alert("Could not generate image. Check console for errors (often CORS related with images).");
        });
    });
});
