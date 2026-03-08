**1️⃣ What is the difference between var, let, and const?**

with var, we can create same name variable,
with var, it is hoisted, meaning can call variable before it is declared
var doesn't maintain block scope

with let & const, we can't create same name variable or use variable before declaration. But with const we can't update it with something new once it is declared, but with let we can. let and const maintains block scope

var, let, const maintains local scope / function scope

**2️⃣ What is the spread operator (...)**

spread operator spreadss non premitive data type's value into it's own individual parts, so when we modify the copy of array or object, the original remains unchanged.


**3️⃣ What is the difference between map(), filter(), and forEach()?**

we use map() to loop over and array and do something to each array element, this returns a new array

forEach() also loops through an array but doesn't return a new array

filter() returns a new array containing all elements that matches a condition

**4️⃣ What is an arrow function?**

arrow function is shorter way to write function, arrow function is not hoisted like traditional function. we can not call an arrow function before initialization


**5️⃣ What are template literals?**

template literals is modern way to write strings and making code dynamic in JavaScripts, like we can add embedded expressions with template literals with ${}. it's written with backticks ``