# CSS Variables
CSS Variables usage on the personal website. 
Instead of repeating the font-family, bg-color and other variables over and over,
[CSS customer properties(variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are used.

In this particular website [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) psuedo-class is used and
font-family and other variables are created in it.

CSS code is as follows
```
:root {
  --font-family: "Roboto", sans-serf;
  --normal-font: 400;
  --bold-font: 700;
  --bolder-font: 900;
  --bg-color: #fcfcfc;
  --primary-color: #4756df;
  --secondary-color: #ff7235;
  --primary-shadow: #8b8eaf;
  --secondary-shadow: #a17a69;
  --bottom-margin: 0.5rem;
  --bottom-margin-2: 1rem;
  --line-height: 1.7rem;
  --transition: 0.3s;
}
```


