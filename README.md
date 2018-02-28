# TheEclecticQuiz
This quiz has some of the HTML, CSS, Javascript, and JQuery concpets I've learnt thus far in my Thinkful Raleigh code camp. 

_________________________________________
Notes about My Quiz Page:
_________________________________________

- The quiz asks users questions on a variety of topics.  It's meant to be relatively easy.

- Only one of the four sections in the <main> has html content at any one time.  Only one section is ever visible to the user (ie, only one section doesn't have the `display : none;` value).

- The general flow of movement for the user is introduction => question => feedback => question => feedback... etc => feedback => results.  From the results, the user is able loop back to the introduction.

- The user will get a frequently updated display at the top of the document with the number of questions asked, questions answered, and current score.

- The page has responsive design for many displays (tested Samsung Galaxy S5/S7, iPhone 7/8/X, iPad, typical 15.6" monitor) and it's accessible to visually impaired users and web crawlers.

_________________________________________
Notes about Writing Code:
_________________________________________

- I'm proud of the use of HTML, Javascript, and JQuery work here.  Clean, easily digestable segments with partitioned functions and descriptive comments.  Check it out!

- (A code-intensive comment; you'll have to dig deep into index.js to understand this).  Find function handleSubmitButton(). After the user submits their choice to a question, I verify whether it's correct.  To continue closing sections before filling new ones, I stored whether the user was correct into a variable.  A tough decision I made was whether to store the variable locally, then pass it on to several functions downstream, or to make the variable global.  Although in this context, it's insignificant and only boils down to preference, I envision complex projects emphasizing ...cleanliness? (creating functions without arguments when possible) or security (preventing exposure of global variables) or stability ( limiting use of global variables absolutely avoid possible side effects).  This kind of call develops with experience and learning preferences.

- Regarding CSS.  If I would tackle this project again I would change 1) how I began coding my CSS and 2) how I used CSS to size the page.

1)  When I began, I mostly used the iPhone 7 view in DevTools and my monitor as gauges for appearance; however, after a fair amount of added properties, I didn't consider several use cases that are greater limiting factors.  In other words, I initially built CSS for mid-sized devices.  I've learned that your code must be made to fit the biggest limiting factors (small width, and large height:width ratios), then apply media queries to use cases from there.  This will be more sensible next time.

2)  I was familiar with the concept of em units going into the coding phase, but sometimes px units were more reliable.  Although the webpage displays pretty well, the CSS doesn't always utilitze scaling units, which bothers me.  Towards the end of my work I understood the versatility or rem units, which I will must certainly incorporate in my next project.


Thanks for reading :)
