$.dialog = function(config) {
	var $dialog = $("<div>").addClass("dialog").hide().appendTo($("body"));
	var $title = $("<div>").addClass("title").appendTo($dialog);
	var $content = $("<div>").addClass("content").appendTo($dialog);
	var $buttons = $("<div>").addClass("buttons").appendTo($dialog);
	var $ok = $("<div>").addClass("button").attr("data-role", "accept").appendTo($buttons);
	var $cancel = $("<div>").addClass("button").attr("data-role", "cancel").appendTo($buttons);
	
	$ok.text("OK");
	$cancel.text("Cancel");

	if (config) {
		if (config.title) {
			$title.text(config.title);
		}
		if (config.content) {
			$content.html(config.content);
		}
		if (config.accept) {
			$ok.on("click", config.accept);
		}
		if (config.cancel) {
			$ok.on("click", config.cancel);
		}
	}
	
	parseDialog();
	
	this.show = function() {
		$dialog.show();	
	};
	
	return this;
};

function parseDialog() {
	/* Dialog */
	$(".dialog").each(function(index, element) {
		var $dialog = $(element);
		
		$dialog.find("[data-role=accept]").click(function(){
			$dialog.hide();
		});
		
		$dialog.find("[data-role=cancel]").click(function(){
			$dialog.hide();
		});
	});
}

$(document).ready(function () {
    var $textareas = jQuery('textarea');

    // set init (default) state   
    $textareas.data('x', $textareas.outerWidth());
    $textareas.data('y', $textareas.outerHeight());

    $textareas.mouseup(function () {

        var $this = $(this);

        if ($this.outerWidth() != $this.data('x') || $this.outerHeight() != $this.data('y')) {
        	//alert($this.outerWidth() + ' - ' + $this.data('x') + '\n' + $this.outerHeight() + ' - ' + $this.data('y'));
        	$this.trigger("resize");
        }

        // set new height/width
        $this.data('x', $this.outerWidth());
        $this.data('y', $this.outerHeight());
    });
});

$(document).ready(function(){
	parseDialog();
	
	/* Input effects */
	$("input[type=text].effects, input[type=password].effects, input[type=email].effects, input[type=search].effects, textarea.effects").each(function(index, element){
		var $input = $(element);
		var $before = $("<span>").addClass("input-before").insertBefore($input);
		var $placeholder = $("<span>").addClass("input-placeholder").insertBefore($input);
		$placeholder.click(function(){
			$input.focus();
		});
		
		
		var colors = ["red", "green", "yellow"];
		for (var i in colors) {
			var color = colors[i];
			if ($input.hasClass(color)) {
				$before.addClass(color);
			}
		}

		var placeholder = $input.attr("placeholder");
		var title = $input.attr("title");
		
		$before.text(title);
		$placeholder.text(title);

		if ($input.attr("placeholder")) {
			$input.attr("placeholder", "");
		}
		
		$before.animate({width: $input.outerWidth()}, 150);
		$input.on("resize", function(){
			$before.animate({width: $input.outerWidth()}, 150);
		});
		
		$input.on("focus", function(){
			$before.addClass("active");
			//$input.attr("placeholder", "");
			$before.addClass("focus");
			$placeholder.removeClass("active");
			$input.attr("placeholder", placeholder);
			$before.animate({width: "inherit"}, 150);
		});
		$input.on("keyup keydown keypress change", function(){
			if($input.val().length <= 0) {

			}
		});
		$input.on("blur", function(){
			if ($input.val().length <= 0) {
				$before.removeClass("active");
				//$input.attr("placeholder", placeholder);
				$placeholder.addClass("active");
			} else {
				$before.animate({width: $input.outerWidth()}, 150);
			}
			$before.removeClass("focus");
			$input.attr("placeholder", "");
		});
		if ($input.val().length > 0) {
			$before.addClass("active");
			//$input.attr("placeholder", "");
			$placeholder.removeClass("active");
		} else {
			$placeholder.addClass("active");
		}
	});
	
	/* Select */
	$("select").each(function(index, element){
		var select = $(element).hide();
		var name = select.attr("name");
		var $select = $("<div>").addClass("select").insertAfter(select);
		var $label = $("<div>").addClass("select-label").appendTo($select);
		var $options = $("<div>").addClass("options").appendTo($select);
		$options.hide();
		$label.click(function(){
			$options.toggle();
			$select.toggleClass("open", $options.is(":visible"));
		});
		var selectOption = function($option) {
			$label.text($option.text());
			select.val($options.attr("val"));
			$options.find(".option").removeClass("selected");
			$option.addClass("selected");
			setTimeout(function(){
				$options.fadeOut(250);
				$select.removeClass("open");
			}, 250);
		};
		select.children().each(function(index, element){
			var child = $(element);
			var addOption = function(option, parent, index) {
				var $option = $("<div>").addClass("option");
				$option.appendTo(parent);
				$option.text(option.text());
				$option.click(function(e){
					selectOption($(this));
					e.stopPropagation();
				});
				if (option.attr("selected") || index == 0) {
					selectOption($option);
				}
			};
			if (child.prop("tagName").toLowerCase() == "optgroup") {
				var $optgroup = $("<div>").addClass("optgroup");
				var $label = $("<div>").addClass("optgroup-label").appendTo($optgroup);
				$label.text(child.attr("label"));
				$optgroup.appendTo($options);
				child.children("option").each(function(index, element){
					var option = $(element);
					addOption(option, $optgroup, index);
				});
			}
			if (child.prop("tagName").toLowerCase() == "option") {
				addOption(child, $options, index);
			}
		});
	});
	
	/* Radiobutton */
	$("input[type=radio]").each(function(index, element) {
		var $radiobutton = $(element);
		var name = $radiobutton.attr("name");
		$radiobutton.hide();
		var $radio = $("<div>").addClass("radiobutton").insertAfter($radiobutton);
		$radio.attr("radioname", name);
		if ($radiobutton.prop("checked")) {
			$radio.addClass("checked");
		} else {
			$radio.removeClass("checked");
		}
		$radio.click(function(){
			$(".radiobutton[radioname="+name+"]").each(function(index, element){
				$(this).removeClass("checked");
			});
			$radiobutton.prop("checked", true);
			if ($radiobutton.prop("checked")) {
				$radio.addClass("checked");
			} else {
				$radio.removeClass("checked");
			}
		});
	});


	/* Checkbox */
	$("input[type=checkbox]").each(function(index, element) {
		var $checkbox = $(element);
		$checkbox.hide();
		var $check = $("<div>").addClass("checkbox").insertAfter($checkbox);
		if ($checkbox.prop("checked")) {
			$check.addClass("checked");
		} else {
			$check.removeClass("checked");
		}
		$check.click(function(){
			$checkbox.prop("checked", !$checkbox.prop("checked"));
			if ($checkbox.prop("checked")) {
				$check.addClass("checked");
			} else {
				$check.removeClass("checked");
			}
		});
	});
	
	/* Tabs */
	$(".tabs").each(function(index, element){
		var $tabgroup = $(element)
		var tabs = [];
		$tabgroup.children(".tab").each(function(index1, element1) {
			var $tab = $(element1);
			var id = $tab.attr("href");
			tabs.push({"element" : $tab, "id" : id});
			$(id).hide();
			$tab.click(function(){
				for (var i in tabs) {
					var tab = tabs[i];
					tab.element.removeClass("selected");
					$(tab.id).hide();
				}
				$(this).addClass("selected");
				$(id).show();
			});
			if ($tab.hasClass("selected")) {
				$tab.click();
			}
		});
	});
});