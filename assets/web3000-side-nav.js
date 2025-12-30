$(document).ready(function () {
	// Cache selectors for performance
	const $navItems = $(".web3000-legal__nav-item");
	const $sections = $(".web3000-legal__block");
	const navWrapperOffset = $(".web3000-legal__nav-wrapper").offset().top;

	// Function to handle scroll event
	function highlightCurrentSection() {
		let currentSection;

		// Loop through each section to find the one currently in view
		$sections.each(function () {
			const sectionOffset = $(this).offset().top;
			if ($(window).scrollTop() >= sectionOffset - navWrapperOffset) {
				currentSection = $(this);
			}
		});

		// Remove 'active' class from all nav items and add it to the current one
		$navItems.removeClass("active");
		if (currentSection) {
			const currentId = currentSection.attr("id");
			$navItems.find(`a[href="#${currentId}"]`).closest(".web3000-legal__nav-item").addClass("active");
		}
	}

	// Bind the scroll event
	$(window).on("scroll", highlightCurrentSection);

	// Call the function initially to set the correct nav item on page load
	highlightCurrentSection();
});
