(async () => {
    var version = document.getElementById("version");
    var versionWarning = document.getElementById("version-warning");
  
    var currentVersion;
    var latestVersion;
  
    try {
      var infoFetch = await fetch(location.origin + "/info.json");
      try {
        var infoResult = await infoFetch.json();
        if (infoResult.version) {
          currentVersion = infoResult.version;
        }
      } catch {}
    } catch {}
  
    try {
      var infoFetch = await fetch("https://cdn.jsdelivr.net/gh/3kh0/3kh0.github.io@latest/info.json");
      try {
        var infoResult = await infoFetch.json();
        if (infoResult.version) {
          latestVersion = infoResult.version;
        }
      } catch {}
    } catch {}
  
    if (currentVersion) {
      version.innerText = "You are on version " + currentVersion;
    } else {
      version.innerText = "Cannot get current version.";
    }
  
    var oldMessage = "Warning: You are on a older version. The current version is %VERSION%"
    var betaMessage = "You are on a beta version! The current release is %VERSION%"
    
    if (latestVersion && currentVersion !== latestVersion) {
      var latestVersionNumber = latestVersion.replace("v", "").replaceAll("-", ".")
      var firstStr = latestVersionNumber.search(/\./) + 1
      latestVersionNumber = latestVersionNumber.substr(0, firstStr) + latestVersionNumber.slice(firstStr).replace(/\./g, '')

      var currentVersionNumber = currentVersion.replace("v", "").replaceAll("-", ".")
      var firstStr = currentVersionNumber.search(/\./) + 1
      currentVersionNumber = currentVersionNumber.substr(0, firstStr) + currentVersionNumber.slice(firstStr).replace(/\./g, '')

      console.log(latestVersionNumber, currentVersionNumber)

      var message;
      versionWarning.innerText = betaMessage.innerText.replace("%VERSION%", latestVersion);
      versionWarning.style.display = "block";
    }
  })();
