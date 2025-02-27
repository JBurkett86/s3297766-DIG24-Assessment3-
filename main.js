/*jshint esversion: 6 */

// Buttons, Dialogs and Tabs

const demoBtn = document.querySelector('.demo-button'); // Button to open the demo dialog
const demoDialog = document.querySelector('.demo-dialog'); // Dialog box for demo booking
const demoForm = document.querySelector("#demo-form"); // Form inside the demo dialog
const menuTabs = document.querySelector("#menu-tabs"); // Navigation menu for tabs
const contentTabs = document.querySelectorAll("#content-tabs sl-tab-panel"); // All content tabs
const logoLink = document.querySelector(".logo-link"); // Logo link to reset to Agency tab
const images = document.querySelectorAll(".slider-img"); // All images in the image slider
const prevBtn = document.getElementById("prevBtn"); // Previous button for image slider
const nextBtn = document.getElementById("nextBtn"); // Next button for image slider
let currentIndex = 0; // Keeps track of the current image index

// ==========================
// Demo Button Click Event
// ==========================
// Open the demo dialog when the demo button is clicked
demoBtn.addEventListener('click', () => {
	demoDialog.show()
});

// Close the dialog on form submission 
// Pretending some other event will happen sennding a booking email
demoForm.addEventListener("submit", (event) => {
	event.preventDefault() // Prevent default form submission
	alert("Demo request submitted!") // Show confirmation alert pop up
	demoDialog.hide() // Close the dialog
});

// ==========================
// Tab Switching Logic
// ==========================
const showTab = (panelName) => {
	contentTabs.forEach(panel => {
		if (panel.getAttribute("name") === panelName) {
			panel.setAttribute("active", "")// Activate the selected tab
			currentIndex = 0 // Reset slider index if page changed
		} else {
			panel.removeAttribute("active")// Deactivate other tabs
			currentIndex = 0
		}
	});
};

// Show the first tab (Agency) by default
showTab("agency")

// Sync menu tab clicks with content tab switching
menuTabs.addEventListener("sl-tab-show", (event) => {
	const selectedPanel = event.detail.name // Get the name of the clicked tab
	showTab(selectedPanel) // Show the selected tab
});

// ==========================
// GSAP Scroll Animations
// ==========================

// Load GSAP only when document ready
document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger) // Register GSAP's ScrollTrigger plugin

    // Use fade-in animation to all product-facts sections on scroll
	gsap.utils.toArray(".product-facts").forEach((section) => {
		gsap.from(section, {
			opacity: 0,
			y: 50,
			duration: 1,
			scrollTrigger: {
				trigger: section,
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		})
	})
})

// ==========================
// Logo Click to Reset to Agency Tab
// ==========================
logoLink.addEventListener("click", (event) => {
	event.preventDefault() // Prevent default link behavior
	menuTabs.show("agency") // Switch to Agency tab
})

// ==========================
// Image Slider Logic
// Function to find all img with the tags, then just show one by one
// ==========================
function showImage(index) {
	images.forEach((img, i) => {
		img.classList.remove("active") // Hide all images
		if (i === index) {
			img.classList.add("active")// Show the selected image
		}
	})
}

// Previous button - Show previous image
prevBtn.addEventListener("click", () => {
	currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1; // Loop back to last image if at first image
	showImage(currentIndex);
})

// Next button - Show next image
nextBtn.addEventListener("click", () => {
	currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1; // Loop back to first image if at last image
	showImage(currentIndex);
})

showImage(currentIndex); // Fire up showImage to load the first image by default