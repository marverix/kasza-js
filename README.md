# Kasza.js

Kasza.js is simple Cache service/helper/tool for your App.

## Getting Started

### Prerequisites

This package is using [UMD](https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js) pattern, so it means that you can use it:

  * in Node.js project
  * browser running project
    * without AMD
    * with AMD

### Installation

#### Option A: With `npm`
    
```sh
npm install kasza-js
```

#### Option B: Download

Download version that fits your better:

[Compressed version - 1.44KB](https://raw.githubusercontent.com/marverix/kasza-js/master/dist/kasza.min.js)

[Uncompressed version - 2.41KB](https://raw.githubusercontent.com/marverix/kasza-js/master/dist/kasza.js)

And simply add HTML tag:

```html
<script type="text/javascript" src="kasza.min.js"></script>
```


### Usage

#### Basic set and get

```js
// set value 'kiszony' for id 'ogorek'
Kasza.set('ogorek', 'kiszony');

// get value for id 'ogorek'
Kasza.get('ogorek'); // will return 'kiszony'
```

What's special about it? Well, you can use it as storage between files. Example:

In `file1.js`:

```js
import Kasza

var commonData = {
  key: value,
  fn: function() {
    return true;
  }
};

Kasza.set('common data', commonData);
```

In `file2.js`:
```js
import Kasza

var commonData = Kasza.get('commmon data');
```

#### Use TTL (Time To Live)

In `file1.js`:

```js
import Kasza

var temporaryData = [1, 2, 3];

// set TTL to 1 minute (60,000ms)
Kasza.set('tmp data', temporaryData, 60000);
```

In `file2.js`:
```js
import Kasza

var temporaryData = Kasza.get('tmp data'); // will return proper data

setTimeout(function() {
  temporaryData = Kasza.get('tmp data'); // will return undefined
}, 60001);
```

#### Use Debug

##### Enable/Disable Debug

```js
Kasza.setup({
  // by default it's false
  debug: true
});
```

##### Use custom debug function

```js
Kasza.setup({
  debug: function(msg) {
    // do something with msg
  }
})
```

## TODO

  * save Cache in IndexedDB (if user wishes to)

<!-- ## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. -->


## FAQ

  * **Why "Kasza"? What does it mean? How should I even pronounce it?!**

    Kasza is Polish word and means groats, kasha. According to [Wiktionary](https://en.wiktionary.org/wiki/kasza#Polish) it's pronounced /ˈka.ʂa/.

    Why? Well - because for _kasza_ for me sounds simmilar to _cache_. That's all 😊 


## Authors

* **Marek Sierociński** - *Initial work* - [marverix](https://github.com/marverix)

See also the list of [contributors](https://github.com/marverix/kasza-js/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
