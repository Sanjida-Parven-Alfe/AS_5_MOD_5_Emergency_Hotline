# Problem-1 
difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll :

getElementById, getElementsByClassName, and querySelector / querySelectorAll These are JavaScript DOM (Document Object Model) manipulation methods used to select elements or components from an HTML document

getElementById is used to select an element by its unique id. It returns the first element with the specified id. If no element with that id is found, it returns null.
getElementsByClassName returns all elements with a specific class name.
querySelector gets the first element that matches a CSS selector.
querySelectorAll gets all elements that match a CSS selector.

# Problem-2
At first Use createElement to create an element and then use appendChild to add it to the document(DOM).

# problem-3
Event bubbling is the term used for when an event occurs on an element, and then bubbles up in the hierarchy of the DOM from that element to its parent, and its parent, and so on until it reaches the whole document.

working of event bubbling:

The event method runs on the element that it occurred on.
Then it goes up to the parent element.
Next it steps up each directory along the path towards the document root.

# problem-4
Event Delegation is a concept in JavaScript where a common parent element is used as an event listener for a number of elements it contains rather than adding an event listener to each. 
This is particularly handy for elements added on-the-fly or many child elements that you need to listen for the same event.

it’s useful because-

It's a way to minimize the amount of event listeners in the browser.
It streamlines your code and makes it easier to manage.
It also behaves well with dynamically added elements since the event listener is actually attached to the parent and the event bubbles from the target element up to the parent.

# problem-5
preventDefault(): This method prevents the default behavior of an event from occurring. For example, if it used on a link (<a> tag), the browser will not follow the link.

stopPropagation(): This method prevents the event from bubbling up to its parent elements. It stops the event from triggering other event listeners on parent elements.
