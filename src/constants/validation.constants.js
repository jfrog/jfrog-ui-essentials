export default function (name, JFrogUILibConfig) {
    let customMessages = JFrogUILibConfig ? JFrogUILibConfig.getConfig().customValidationMessages : undefined;
    if (customMessages) return angular.extend(angular.copy(commonMessages), customMessages[name]);
    else return commonMessages;
}

const commonMessages = {
    "required": "You must fill in this field",
    "unique": "This value must be unique",
    "validator": "This value is invalid",
    "email": "Please enter a valid email",
    "url": "Please enter a valid url",
    "number": "Please enter an Integer",
    "min": "Value too low",
    "max": "Value too high",
    "minlength": "Value too short",
    "maxlength": "Value too long",
    "invalidCron": "The cron expression is invalid",
    "pastCron": "The next run time is in the past",
    "uniqueId": "Key is already used",
    "name": "Name cannot be blank or contain /\\:|?*\"<>",
    "xmlName": "Name cannot be blank or contain spaces & special characters",
    "integerValue": "Value must be an integer number"
};

