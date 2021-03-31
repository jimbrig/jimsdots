require.config({
    paths: {
        "customize-ui" : "file://./c:/Users/Jimmy Briggs/AppData/Roaming/Code - Insiders/User/globalStorage/iocave.customize-ui/modules",
        "monkey-generated" : "file://./c:/Users/Jimmy Briggs/AppData/Roaming/Code - Insiders/User/globalStorage/iocave.monkey-patch/modules"
    }
});

define(["monkey-generated/entrypoint-main", "customize-ui/title-bar-main-process"], function (){});