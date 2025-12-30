$(document).ready(function () {
	if ($(window).width() <= 1024) {
		$("a.web3000-collection__block").on("click", function (event) {
			if (!$(this).hasClass("web3000-collection__block--active")) {
				event.preventDefault();
				$(".web3000-collection__block").removeClass(
					"web3000-collection__block--active"
				);
				$(this).addClass("web3000-collection__block--active");
			}
		});
	}
});
