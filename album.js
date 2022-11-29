var PageSize = 18;
var Page = 0; //初始化頁數
var ScrollHeight = 0;

$(init);

function init() {

	SetTouchFooter();

	$(window).off('scroll').on("scroll", function () {
		let self = window.pageYOffset + window.innerHeight;
		if (self >= ScrollHeight) {
			Page++;
			Get(Page);
			ScrollHeight = $(document).height() - 200;
		}
	});

	// $('#albums').empty();
	Get(Page);
	ScrollHeight = $(document).height();
}

function Get(size) {
	var $obj = $('#albums');

	var data = List.filter(function (x, i) { return i >= size * PageSize && i < (size * PageSize + PageSize) });

	$.each(data, (i, item) => {
		var html = `
                <div class="gallery" title="${item.title}">
                    <a target="_blank" href="${item.productUrl == "" ? "#" : item.productUrl}">
                        <div class="img">
                            <img src="${item.coverPhotoBaseUrl == "" ? "./icon/no-image-icon-23494-Windows.ico" : item.coverPhotoBaseUrl}">
                        </div>
                        <div class="desc">(${item.mediaItemsCount} 個項目)</div>
                        <div class="desc">${item.title}<br>${item.Des ?? ""}</div>
                    </a>
                </div>
		`;

		$obj.append(html);
	});
}

function SetTouchFooter() {
	$(".footer a").on("click", function (e) {
		if (window.matchMedia('(hover: none)').matches && $(".footer").is('.top-0')) {
			e.preventDefault();
		}
	})

	$(".footer").on("touchend", function () {
		var $this = $(this);
		if ($this.is('.top-0')) {
			$this.removeClass('top-0');
		}
		else {
			$this.addClass('top-0');
		}
	})

	$(window).on("touchend", function (e) {
		if ($(e.target).closest(".footer").length == 0) {
			$(".footer").removeClass('top-0');
		}
	})

	$(window).on("touchmove", function (e) {
		$(".footer").removeClass('top-0');
	})

	$(window).resize(function () {
		$(".footer").removeClass('top-0');
		ScrollHeight = $(document).height();
	})
}