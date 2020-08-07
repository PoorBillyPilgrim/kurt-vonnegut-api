# Kurt Vonnegut API
> _If this isn't nice, what is?_

The Kurt Vonnegut API is a RESTful API built using NodeJS, Express, MongoDB, and EJS. It was designed to serve metadata on Kurt Vonnegut's bibliography, currently returning information on his novels, collected works, and plays as JSON. 

## Metadata
Form | Metadata | Form | Metadata | Form | Metadata
---- | -------- | ---- | -------- | ---- | -------
Novels | title<br>subtitle<br>form<br>genre<br>publisher<br>year<br>pages<br>chapters<br>setting<br>characters<br>wiki<br> | Collected Works | <br>title<br>form<br>genre<br>publisher<br>year<br>pages<br>contents<br>wiki<br><br> | Plays | <br>title<br>form<br> genre<br>publisher<br>year<br>setting<br>characters<br>wiki<br><br>

## Routes
- `/api`
- `/api/novels`
- `/api/collections`
- `/api/plays`

## Filters
On /api route, filter results using any combination of title, form, genre, and year
you can also search multiples of each filter, separated by commas

:white_check_mark: `https://kurtvonnegutapi.com/api?year=1952,1969`

:x: `https://kurtvonnegutapi.com/api?year1952,1969&title=Breakfast of Champions`

## Usage
Use any http library, below is an example using [Request](https://github.com/request/request#readme)
```js
// Request
const request = require('request');

request({
    url: 'https://kurtvonnegutapi.com/api?title=Slaughterhouse-Five',
    json: true
}, function (error, response, body) {
    console.log(body)
});

// Output
[
  {
    _id: '5f07523011807ba43fb805b0',
    title: 'Slaughterhouse-Five',
    subtitle: "the Children's Crusade: A Duty-Dance with Death",
    form: 'novel',
    genre: [
      'dark comedy',
      'satire',
      'science fiction',
      'war novel',
      'metafiction',
      'postmodernism'
    ],
    publisher: 'Delacorte',
    year: 1969,
    pages: 215,
    chapters: 10,
    setting: [ [Object], [Object], [Object], [Object] ],
    characters: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    wiki: 'https://en.wikipedia.org/wiki/Slaughterhouse-Five'
  }
]
// To view nested arrays and objects
body[0].characters[0]; 
/* 
{ 
    firstName: 'Billy', 
    lastName: 'Pilgrim' 
}
*/

body[0].setting[0];
/*
{
    city: 'Dresden',
    country: 'Germany',
    fictional: false
}
*/
```

