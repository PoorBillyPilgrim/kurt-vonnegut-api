# Kurt Vonnegut API
> _If this isn't nice, what is?_

The Kurt Vonnegut API is a RESTful API built using Node.js, Express, MongoDB, and EJS. It was designed to serve metadata on Kurt Vonnegut's bibliography, currently returning information on his novels, collected works, and plays as JSON. 

## What is an API?
A [RESTful API](https://restfulapi.net/) is simply computer code that uses HTTP to request services from a program running on an operating system. It allows anyone to access a partcular set of data using whatever computer language on whatever operating system. In this case, this API makes it really easy to get info on Kurt Vonnegut's bibliography. All you need is a URI to get the data.

`https://kurtvonnegutapi.com/api`

This project is catered for programmers interested in integrating Kurt Vonnegut data into their own projects, or for academic researchers looking to use Kurt Vonnegut metadata in their Digital Humanities projects. Look in [Usage](https://github.com/PoorBillyPilgrim/kurt-vonnegut-api#usage) for inspiration.

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
You can currently only filter searches using the main `/api` route, using any combination of title, form, genre, and year seperated by an ampersand (`&`).

:white_check_mark: `https://kurtvonnegutapi.com/api?title=Slaughterhouse-Five&year=1952`

You can search using multiple filters separated by commas

:white_check_mark: `https://kurtvonnegutapi.com/api?year=1952,1969`

You cannot, however, use multiple filters and different filters at the same time.

:x: `https://kurtvonnegutapi.com/api?year1952,1969&title=Breakfast of Champions`

## Usage
You can use any http library to return a JSON array of the data. 
### JavaScript
Below is an example using [Request](https://github.com/request/request#readme), a Node.js package.
```js
// Request
const request = require('request');

request({
    url: 'https://kurtvonnegutapi.com/api?title=Slaughterhouse-Five',
    json: true
}, function (error, response, bibliography) {
    console.log(bibliography)
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

// Notice that arrays containing objects are returned as [Object]
// Use object and array notation to access
bibliography[0].characters[0]; 
/* 
{ 
    firstName: 'Billy', 
    lastName: 'Pilgrim' 
}
*/

bibilography[0].setting[0];
/*
{
    city: 'Dresden',
    country: 'Germany',
    fictional: false
}
*/
```
Some of the metadata may be useful for textual analysis. In particular, `bibliography[i].characters` and `bibliography[i].setting`
```js
// Appearances of Kilgore Trout across various novels
request({
    url: 'https://kurtvonnegutapi.com/api/novels',
    json: true
}, function (error, response, bibliography) {
    let kilgoreTroutAppearances = [];
    for (let i = 0; i < bibliography.length; i++) {
        for (let j = 0; j < bibliography[i].characters.length; j++) {
            if (bibliography[i].characters[j].firstName === "Kilgore" && bibliography[i].characters[j].lastName === "Trout") {
                kilgoreTroutAppearances.push(bibliography[i])
            }
        }
    }
    console.log(kilgoreTroutAppearances)
});
/*
[
  {
    _id: '5f07523011807ba43fb805ab',
    title: 'God Bless You, Mr. Rosewater',
    subtitle: 'Pearls Before Swine',
    form: 'novel',
    genre: [ 'satire', 'postmodernism' ],
    publisher: 'Holt, Rinehart and Winston',
    year: 1965,
    pages: 218,
    chapters: null,
    setting: [ [Object], [Object] ],
    characters: [ [Object], [Object], [Object] ],
    wiki: 'https://en.wikipedia.org/wiki/God_Bless_You,_Mr._Rosewater'
  },
  {
  ...
  }
]
*/
```
### Python
[Requests](https://requests.readthedocs.io/en/master/), an HTTP library for Python, gives you a simle method for returning data
```python
# returns JSON array
import requests

response = requests.get('https://kurtvonnegutapi.com/api?title=Slaughterhouse-Five')

print(response.json())

# output
"""
[{'_id': '5f07523011807ba43fb805b0', 'title': 
'Slaughterhouse-Five', 'subtitle': "the Children's
Crusade: A Duty-Dance with Death", 'form': 'novel',
'genre': ['dark comedy', 'satire', 'science fiction', 
'war novel', 'metafiction', 'postmodernism'], 
'publisher': 'Delacorte', 'year': 1969, 'pages': 215, 
'chapters': 10, 'setting': [{'city': 'Dresden', 
'country': 'Germany', 'fictional': False}, {'planet': 
'Tralfamadore', 'fictional': True}, {'city': 'Ilium', 
'state': 'New York', 'country': 'United States of 
America', 'fictional': False}, {'city': 'Ardennes', 
'country': 'Belgium', 'fictional': False}], 
'characters': [{'firstName': 'Billy', 'lastName': 
'Pilgrim'}, {'firstName': 'Kilgore', 'lastName': 
'Trout'}, {'firstName': 'Eliot', 'lastName': 
'Rosewater'}, {'firstName': 'Roland', 'lastName': 
'Weary'}, {'firstName': 'Paul', 'lastName': 'Lazzaro'}
, {'firstName': 'Edgar', 'lastName': 'Derby'}, 
{'firstName': 'Robert', 'lastName': 'Pilgrim'}, 
{'firstName': 'Valencia', 'lastName': 'Merble'}, 
{'firstName': 'Barbara', 'lastName': 'Pilgrim'}, 
{'firstName': 'Howard', 'middleName': 'W', 'lastName': 
'Campbell', 'suffix': 'Jr'}, {'firstName': 'Montana', 
'lastName': 'Wildhack'}, {'firstName': 'Bertam', 
'middleName': 'Copeland', 'lastName': 'Rumfoord'}, 
{'firstName': 'Wild Bob'}], 'wiki': 'https://en.
wikipedia.org/wiki/Slaughterhouse-Five'}]
"""
```
## Contributions
Contributions are always welcome. I have a particular interest in expanding the API's data set of narrative elements. Currently, the API returns calls for characters and setting. I am interested in ideas for other narrative elements like themes, points of view, conflicts, etc.

If you have any ideas or issues you would like to discuss, feel free to contact me at [kurtvonnegutapi@gmail.com](mailto:kurtvonnegutapi@gmail.com).

### Pull Requests
When making a pull request, please clearly describe the problem and solution.

## Credits
First time creating an API. Combed GitHub for some great inspiration. These projects were an immense help.

- [The Rick and Morty API](https://github.com/afuh/rick-and-morty-api)
- [Anime Chan](https://github.com/RocktimSaikia/anime-chan)
- [The Lord of the Rings API](https://github.com/gitfrosh/lotr-api)


## License
BSD-3-Clause License © Tyler Jones