jQuery.expr[":"].containsIgnoreCase = function (a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
class NewsletterPopup extends HTMLElement {
	constructor() {
		super();

		this.footerNewsletterLink = $(
			'a.list-menu__item--link:containsIgnoreCase("newsletter")'
		);

		this.popup = this;
		this.backdrop = $(".background-overlay");
		this.timeToShow = parseInt(this.popup.getAttribute("data-delay"));
		this.expiresDate = this.popup.getAttribute("data-expire");

		// Add event listener to the footer newsletter link
		this.footerNewsletterLink.on("click", this.openPopup.bind(this));

		if (this.getCookie("newsletter-popup") === "") {
			setTimeout(() => {
				this.openPopup();
			}, this.timeToShow);
		}

		document.body.addEventListener("click", this.onBodyClickEvent.bind(this));

		this.querySelector("[data-close-newsletter-popup]").addEventListener(
			"click",
			this.setClosePopup.bind(this)
		);
	}

	openPopup(event) {
		if (event) {
			event.preventDefault();
		}
		document.body.classList.add("newsletter-show");
		this.backdrop.fadeIn();

		setTimeout(() => {
			document.body.classList.add("show-newsletter-image");
		}, 700);
	}

	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		const expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	getCookie(cname) {
		const name = cname + "=";
		const ca = document.cookie.split(";");

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}

		return "";
	}

	setClosePopup() {
		this.setCookie("newsletter-popup", "closed", this.expiresDate);
		this.backdrop.fadeOut();
		document.body.classList.remove("newsletter-show");

		setTimeout(() => {
			document.body.classList.remove("show-newsletter-image");
		}, 700);
	}

	onBodyClickEvent(event) {
		if (
			!this.contains(event.target) &&
			$(event.target).closest("[data-open-newsletter-popup]").length === 0 &&
			$(event.target).closest(
				'a.list-menu__item--link:containsIgnoreCase("newsletter")'
			).length === 0 &&
			$(event.target).closest("#shopify-pc__banner").length === 0 &&
			document.querySelector("body").classList.contains("newsletter-show")
		) {
			this.setClosePopup();
		}
	}
}

customElements.define("newsletter-popup", NewsletterPopup);
