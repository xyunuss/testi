class CustomerAuth extends HTMLElement {
	constructor() {
		super();

		this.auth = this;
		this.backdrop = $(".background-overlay");
		//console.log("Customer Auth");

		if (document.querySelector("[data-open-auth-popup]")) {
			document.querySelectorAll("[data-open-auth-popup]").forEach((openPopup) => openPopup.addEventListener("click", this.setOpenPopup.bind(this)));
		}

		if (document.querySelector("[data-close-auth-popup]")) {
			document.querySelector("[data-close-auth-popup]").addEventListener("click", this.setClosePopup.bind(this));
		}

		if (document.querySelector("[data-open-auth-sidebar]")) {
			document.querySelectorAll("[data-open-auth-sidebar]").forEach((openSidebar) => openSidebar.addEventListener("click", this.setOpenSidebar.bind(this)));
		}

		if (document.querySelector("[data-close-auth-sidebar]")) {
			document.querySelector("[data-close-auth-sidebar]").addEventListener("click", this.setCloseSidebar.bind(this));
		}

		document.body.addEventListener("click", this.onBodyClickEvent.bind(this));
	}

	setOpenPopup(event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("open popupidebar");
		$(this).fadeIn();
		// this.backdrop.fadeIn();

		if (document.body.classList.contains("template-customers-login")) {
			$("html, body").animate(
				{
					scrollTop: 0,
				},
				700
			);
		} else {
			document.body.classList.add("auth-popup-show");
		}
	}

	setClosePopup(event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).fadeOut();
		document.body.classList.remove("auth-popup-show");
	}

	setOpenSidebar(event) {
		event.preventDefault();
		event.stopPropagation();
		$(".mobilemenu_open .site-nav-mobile [data-menu-close-sidebar], .open_search_mobile .halo-sidebar_search .halo-sidebar-close").trigger("click");
		$(this).fadeIn();
		// this.backdrop.fadeIn();

		if (document.body.classList.contains("template-customers-login")) {
			$("html, body").animate(
				{
					scrollTop: 0,
				},
				700
			);
		} else {
			document.body.classList.add("auth-sidebar-show");
		}
	}

	setCloseSidebar(event) {
		event.preventDefault();
		event.stopPropagation();
		document.body.classList.remove("auth-sidebar-show");
		$(this).fadeOut();
	}

	onBodyClickEvent(event) {
		if (document.body.classList.contains("auth-popup-show")) {
			if (!this.contains(event.target) && $(event.target).closest("[data-open-auth-popup]").length === 0) {
				this.setClosePopup(event);
			}
		}

		if (document.body.classList.contains("auth-sidebar-show")) {
			if ((!this.contains(event.target) && $(event.target).closest("[data-open-auth-sidebar]").length === 0 && $(event.target).closest("[data-auth-sidebar]").length === 0) || ($(event.target).closest(".web3000-component-auth").length === 1 && $(event.target).closest("form").length === 0 && $(event.target).closest(".web3000-component-auth__wrapper").length === 0)) {
				event.stopImmediatePropagation();
				this.setCloseSidebar(event);
			}
		}
	}
}

customElements.define("customer-auth", CustomerAuth);
