const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry)
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}

	});
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));




$(function() {
  
	// contact form animations
	$('#contact').click(function() {
	  $('#contactForm').fadeToggle();
	})
	$(document).mouseup(function (e) {
	  var container = $("#contactForm");
  
	  if (!container.is(e.target) // if the target of the click isn't the container...
		  && container.has(e.target).length === 0) // ... nor a descendant of the container
	  {
		  container.fadeOut();
	  }
	});
	
  });