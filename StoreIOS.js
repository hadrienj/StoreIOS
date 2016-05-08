function StoreIOS() {
}

StoreIOS.prototype.append = function(file, obj) {
  var that = this;
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ', fs);
    var that1 = that;
    fs.root.getFile(file, {create: true, exclusive: false}, function (fileEntry) {
      console.log("fileEntry is file? " + fileEntry.isFile.toString());
      that1.writeAtEnd(fileEntry, obj);
    }, function() {console.log('error: getFile')});
  }, function() {console.log('error: requestFileSystem')});
};
StoreIOS.prototype.writeAtEnd = function(fileEntry, dataObj) {
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function() {
      console.log("Successful file write...");
    };
    fileWriter.onerror = function (e) {
      console.log("Failed file read: " + e.toString());
    };
    // go at the end of the file to append
    fileWriter.seek(fileWriter.length);
    fileWriter.write(dataObj);
  });
};

StoreIOS.prototype.getList = function(callbackList) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('Get list of files; file system open: ', fs);
    var reader = fs.root.createReader();
    reader.readEntries(function (entries) {
      callbackList(entries);
    });
  }), function() {console.log('error')};
};

StoreIOS.prototype.read = function(file, callback) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    fs.root.getFile(file, {create: false, exclusive: false}, function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          callback(this.result);
        };
        reader.readAsText(file);
      }, function() {console.log('error read')});
    })
  });
};

