$(document).ready(function () {
	// Initialize Isotope
	var isotopes = ["product-grid", "faq", "collection"];

	isotopes.forEach((isotope) => {
		if ($(".web3000-isotope-component--" + isotope).length == 0) {
			return;
		}
		var isotopeConfig = {
			itemSelector: ".web3000-isotope__block",
			gutter: 0,
			layoutMode: isotope === "product-grid" ? "fitRows" : "masonry",
			// fitRows: {
            //     gutter: ".gutter-sizer",
			// },
			columnWidth: ".grid-sizer",
            percentPosition: true,
		};

		var $grid = $(".web3000-isotope-component--" + isotope + " .web3000-isotope").isotope(isotopeConfig);

		function setResponsiveIsotope1() {
			var windowWidth = window.innerWidth;

			if (windowWidth > 1023 && isotope === "collection") {
				$grid.options.layoutMode = "fitRows";
			} else {
				$grid.options.layoutMode = "masonry";
			}

			// Trigger a layout update
			$grid.arrange();
		}

		function setResponsiveIsotope() {
			var windowWidth = window.innerWidth;

			var newLayoutMode = windowWidth > 1023 && isotope === "collection" ? "fitRows" : "masonry";

			// Only update layoutMode if it has changed
			if ($grid.data("isotope").options.layoutMode !== newLayoutMode) {
				$grid.isotope("option", { layoutMode: newLayoutMode });

				// Trigger a layout update
				$grid.isotope("layout");
			}
		}

		// Call the function once to set initial layout mode
		setResponsiveIsotope();

		// Call the function on window resize
		window.addEventListener("resize", setResponsiveIsotope);

		// Layout update after images are loaded
		$grid.imagesLoaded().progress(function () {
			setResponsiveIsotope();
		});

        $grid.imagesLoaded().done(function () {
			setResponsiveIsotope();
			$(window).trigger("resize");
		});

		// Filter items when filter button is clicked
		$(".web3000-isotope-component--" + isotope + " .web3000-filter-panel .web3000-filter-button").on("click", function () {
			if ($(this).hasClass("is-selected")) {
				$(this).removeClass("is-selected");
				$grid.isotope({ filter: "*" });
			} else {
				$(".web3000-isotope-component--" + isotope + " .web3000-filter-button").removeClass("is-selected");
				$(this).addClass("is-selected");
				var filterValue = $(this).attr("data-value");
				$grid.isotope({ filter: '[data-group="' + filterValue + '"]' });
			}
		});
	});
});
