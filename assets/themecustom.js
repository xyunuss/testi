(function ($) {
	var $body = $("body"),
		$doc = $(document),
		$html = $("html"),
		$win = $(window);

	$doc.ready(() => {
		/*START web3000 */

		//Smooth scroll to anchor links
		$(document).ready(function () {
			$(".product-form__radio").on("click", function (e) {
				$("body").addClass("free-scroll");
				setTimeout(function () {
					$("body").removeClass("free-scroll");
				}, 100);
			});

			// Smooth scroll to anchor links
			$('a[href^="#"]').on("click", function (e) {
				e.preventDefault();

				var target = $(this.getAttribute("href"));
				if (target.length) {
					var remToPixelRatio = parseFloat(getComputedStyle(document.documentElement).fontSize);
					var offsetRem = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--page-content-pt"));
					var offsetPx = offsetRem * remToPixelRatio;

					$($html, $body).animate(
						{
							scrollTop: target.offset().top - offsetPx - 20,
						},
						1000
					);
				}
			});
		});
		/*END web3000 */

		$(".cart-link").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			// console.log("cart-link");
			//$body.addClass("cart-sidebar-show");
			//halo.initSidebarCart();
			//halo.updatePopupCart();
			//halo.updateSidebarCart();
			//$("body").addClass("cart-sidebar-show");

			$(".header__icon--cart").trigger("click");
			//setTimeout(() => {
			//halo.updateSidebarCart();
			//}, 200);
		});

		$(".header__icon--cartxxx").on("click", function (e) {
			e.preventDefault();
			//e.stopPropagation();
			$body.addClass("cart-sidebar-show");
			halo.initSidebarCart();
			halo.updateSidebarCart();
			if (!e.isTrigger) {
				$body.addClass("cart-sidebar-show");
				halo.initSidebarCart();
				halo.updateSidebarCart();

				// Trigger one additional click after a delay
				setTimeout(() => {
					$(this).trigger("click");
				}, 200);
			}
		});

		var ingredients = $("[data-ingredients]").first().attr("data-ingredients");
		if (ingredients) {
			$(".product-info1").html("<p>" + ingredients + "</p>");
		}

		$(".web3000-swatch").on("click", function () {
			var ingredients = $(this).data("ingredients");
			if (ingredients) {
				$(".product-info1").html("<p>" + ingredients + "</p>");
			}
			var variantId = $(this).prev().attr("data-variant-id");
			$(".swiper-slide[data-slide-variant]").hide();
			$('.swiper-slide[data-slide-variant="' + variantId + '"]').show();
			var swiperProduct = $(".swiper-product").get(0).swiper;
			if (swiperProduct) {
				swiperProduct.slideTo(0, 0);
				swiperProduct.update();
			}
		});

		function closeOverlays() {
			$(".mobilemenu_open .site-nav-mobile [data-menu-close-sidebar], .open_search_mobile .halo-sidebar_search .halo-sidebar-close, .auth-sidebar-show .halo-sidebar-close-guest").trigger("click");
		}

		function getUrlParameter(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
			var results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

		// Check for variant parameter in URL
		var variantId = getUrlParameter("variant");
		if (variantId) {
			var swatch = $('.web3000-swatch[data-variant-id="' + variantId + '"]');
			if (swatch.length) {
				var ingredients = swatch.data("ingredients");
				if (ingredients) {
					$(".product-info1").html("<p>" + ingredients + "</p>");
				}
			}
			$(".swiper-slide[data-slide-variant]").hide();
			$('.swiper-slide[data-slide-variant="' + variantId + '"]').show();
			var swiperProduct = $(".swiper-product").get(0).swiper;
			if (swiperProduct) {
				swiperProduct.update();
			}
		}

		setTimeout(function () {
			$(".web3000-isotope__block, .web3000-faqs__block").each(function (index) {
				var $this = $(this);
				setTimeout(function () {
					$this.addClass("active");
				}, index * 200);
			});
		}, 200);

		$(document).on("click", ".ingredients-seemore", function () {
			$(this).parent().next(".ingredients-more").toggleClass("active");
			$(this).parent().next(".ingredients-more").slideToggle(400);
		});

		for (let i = 0; i < 5; i++) {
			$(".previewCartItem").parent().append($(".previewCartItem").clone());
		}

		// $(document).on("click", 'a[href*="#account"]', function (event) {
		// 	event.preventDefault();
		// 	//closeOverlays();
		// 	$("[data-open-auth-sidebar]").trigger("click");
		// });

		//$(".section-header-navigation").midnight();

		$("body").addClass("start-animation");

		setTimeout(function () {
			$("body").addClass("first-start");
		}, 500);

		if ($("body").hasClass("template-index")) {
			let lastKnownScrollPosition = 0;
			let ticking = false;

			function handleScroll(scrollPos) {
				if (scrollPos === 0) {
					$("body").addClass("start-animation");
				} else {
					$("body").removeClass("start-animation");
				}
			}

			window.addEventListener("scroll", function () {
				lastKnownScrollPosition = window.scrollY;

				if (!ticking) {
					window.requestAnimationFrame(function () {
						handleScroll(lastKnownScrollPosition);
						ticking = false;
					});

					ticking = true;
				}
			});
		}

		const swiper = new Swiper(".swiper.productView-nav", {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 500,

			on: {
				reachEnd: function () {
					$("body").addClass("slider-end");
					// this.mousewheel.disable();
				},
				// fromEdge: function () {
				// 	//$("body").removeClass("slider-end");
				// 	this.mousewheel.enable();
				// },
			},
			breakpoints: {
				1024: {
					direction: "vertical",
					speed: 1000,
					mousewheel: {
						enabled: true,
						// eventsTarget: ".shopify-section:first-child",
						releaseOnEdges: true,
						sensitivity: 0.5,
					},
				},
			},
		});

		function initMidnightHeader() {
			const checkMidnightHeader = () => {
				let isDarkMenuNeeded = false;

				// Check each midnight element
				midnightElements.forEach((element) => {
					const rect = element.getBoundingClientRect();
					// If any element is at top and visible, we need dark menu
					if (rect.top <= 0 && rect.bottom > 0) {
						isDarkMenuNeeded = true;
					}
				});

				// Apply or remove dark-menu class based on any element needing it
				if (isDarkMenuNeeded) {
					document.body.classList.add("dark-menu");
				} else {
					document.body.classList.remove("dark-menu");
				}

				requestAnimationFrame(checkMidnightHeader);
			};

			requestAnimationFrame(checkMidnightHeader);
		}

		const midnightElements = document.querySelectorAll('[data-midnight="black"]');
		if (midnightElements.length > 0) {
			initMidnightHeader();
		}

		function initMidnightHeaderWhite() {
			const checkMidnightHeaderWhite = () => {
				let isWhiteMenuNeeded = false;

				// Check each midnight element
				midnightElementsWhite.forEach((element) => {
					// Changed from midnightElements to midnightElementsWhite
					const rect = element.getBoundingClientRect();
					// If any element is at top and visible, we need white menu
					if (rect.top <= 0 && rect.bottom > 0) {
						isWhiteMenuNeeded = true;
					}
				});

				// Apply or remove white-menu class based on any element needing it
				if (isWhiteMenuNeeded) {
					document.body.classList.add("white-menu");
				} else {
					document.body.classList.remove("white-menu");
				}

				requestAnimationFrame(checkMidnightHeaderWhite);
			};

			requestAnimationFrame(checkMidnightHeaderWhite);
		}

		const midnightElementsWhite = document.querySelectorAll('[data-midnight="white"]');
		if (midnightElementsWhite.length > 0) {
			initMidnightHeaderWhite();
		}

		$(document).on("click", ".halo-sidebar-close, .background-overlay", function (e) {
			e.preventDefault();
			//e.stopPropagation();
			$("body").removeClass("menu_open open_search_mobile auth-sidebar-show");
		});

		const twoColTextObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const textElement = entry.target.querySelector(".web3000-two-col-image__text");
					if (!textElement) return;

					if (entry.isIntersecting) {
						textElement.style.opacity = "1";
					} else {
						textElement.style.opacity = "0";
					}
				});
			},
			{
				threshold: 0.66, // Show when 2/3 of element is visible
			}
		);

		document.querySelectorAll(".web3000-two-col-image__column").forEach((column) => {
			twoColTextObserver.observe(column);
		});

		if (Shopify.designMode) {
			$("#web3000-newsletter-popup, .background-overlay").addClass("hidden");
		}

		// setTimeout(() => {
		// 	debugger;
		// }, 1800);
	});
})(jQuery);
