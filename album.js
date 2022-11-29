var PageSize = 18;
var Page = 0; //初始化頁數
var ScrollHeight = 0;

$(init);

async function init() {

	SetTouchFooter();
	
	$(window).off('scroll').on("scroll", async function (e) {
		let self = window.pageYOffset + window.innerHeight;
		if (self >= ScrollHeight) {
			Page++;
			await Get(Page);
			ScrollHeight = $(document).height() - 200;
		}
	});

	$('#albums').empty();
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
	$(".footer").on("touchend", function () {
		$this = $(this);
		if ($this.is('.top-0')) {
			$this.removeClass('top-0');
		}
		else {
			$this.addClass('top-0');
		}
	})

	$(window).on("touchmove", function () {
		$this.removeClass('top-0');
	})

	$(window).resize(function () {
		$(".footer").removeClass('top-0');
	})
}