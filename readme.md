
The StoreIOS module is used to store and fetch documents on an iOS device through Phonegap. It uses the [Phonegap plugin File](http://docs.phonegap.com/en/edge/cordova_file_file.md.html).

# Quick Start

## Write data

```javascript
document.addEventListener("deviceready", function() {
  var storeIOS = new StoreIOS();
  storeIOS.append('fileName1.txt', 'Ceci est un test.');
});
```

This will create a file named 'fileName1.txt' containing 'Ceci est un test.' in the `Documents` folder of the application.

If the file 'fileName.txt' does not exist it will be created.

The file can be retrieve with iTunes if the option `Application supports iTunes file sharing` is set to `YES` in the application's `.plist` file.

## Read Data

```javascript
document.addEventListener("deviceready", function() {
  storeIOS.read('fileName1.txt', callback);

  function callback(file) {
    document.getElementById('divToFill').innerHTML = file;
  }
});
```

This will get the content of the file 'fileName1.txt' and display it in a HTML div.

The `read()` method requires the file name as first argument and the function using the file content as a second argument. In this example, the callback use the file content to display it.

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

In this example, we get a list of each files in the Documents folder of the application.

# Dependencies

- Cordova

Don't forget to include the `cordova.js` file:

```javascript
<script src="cordova.js"></script>
```
