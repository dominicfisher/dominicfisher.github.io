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



  const scrollers = document.querySelectorAll(".scroller");

  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	addAnimation();
  }
  
  function addAnimation() {
	scrollers.forEach((scroller) => {
	  // add data-animated="true" to every `.scroller` on the page
	  scroller.setAttribute("data-animated", true);
  
	  // Make an array from the elements within `.scroller-inner`
	  const scrollerInner = scroller.querySelector(".scroller_inner");
	  const scrollerContent = Array.from(scrollerInner.children);
  
	  // For each item in the array, clone it
	  // add aria-hidden to it
	  // add it into the `.scroller-inner`
	  scrollerContent.forEach((item) => {
		const duplicatedItem = item.cloneNode(true);
		duplicatedItem.setAttribute("aria-hidden", true);
		scrollerInner.appendChild(duplicatedItem);
	  });
	});
  }