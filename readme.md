
The StoreIOS module is used to store and fetch documents on an iOS device through Phonegap. It uses the [Phonegap plugin File](http://docs.phonegap.com/en/edge/cordova_file_file.md.html).

# Quick Start

## Write data

```javascript
document.addEventListener("deviceready", function() {
  var storeIOS = new StoreIOS();
  storeIOS.append('fileName1.txt', 'Ceci est un test');
});
```

This will create a file named `fileName1.txt` containing 'Ceci est un test' in the `Documents` folder of the application.

If the file `fileName.txt` does not exist it will be created.

The file can be retrieve with iTunes if the option `Application supports iTunes file sharing` is set to `YES` in the application's `.plist` file.

## Read Data

```javascript
document.addEventListener("deviceready", function() {
  storeIOS.read('fileName1.txt', callback);

  function callback(file) {
    // do something with the file
    document.getElementById('divToFill').innerHTML = file.result;
  }
});
```

This will read the file object `fileName1.txt` and use the `result` property to display its content in a HTML div. See the different properties and methods of the Reader object [here](http://docs.phonegap.com/en/edge/cordova_file_file.md.html#FileReader).

The `read()` method requires the file name as first argument and the callback function using the file content as a second argument.

## Get file list

```javascript
document.addEventListener("deviceready", function() {
  // create empty file list
  var files = [];
  storeIOS.getList(callback);

  function callback(fileNames) {
    for (var i=0; i<filesNames.length; i++) {
      // select .txt files
      if (filesNames[i].name.indexOf(".txt") != -1) {
        // remove '.txt' of the file name and add to the file list
        files.push(filesNames[i].name.replace('.txt', ''));
      }
      if (i===filesNames.length-1) {
        // do something with this file list
        document.getElementById('divToFill').innerHTML = files;
      }
    }
  }
});
```

The `getList` method takes only one argument: the callback function using the retrieved list of files present in the Document folder of the application. The list is an array of file names (e.g. `['file1.txt', 'file2.txt', 'test.json']`).

In this example, we get the list of files, iterate on this list and select only the `.txt` files. We then add these file names in a new array after removing the file extension `.txt`.

# Dependencies

- Cordova

Don't forget to include the `cordova.js` file:

```javascript
<script src="cordova.js"></script>
```
