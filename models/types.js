export var Status;
(function (Status) {
    Status[Status["MANUFACTURED"] = 0] = "MANUFACTURED";
    Status[Status["ASSEMBLED"] = 1] = "ASSEMBLED";
    Status[Status["SHIPPED"] = 2] = "SHIPPED";
    Status[Status["DEPLOYED"] = 3] = "DEPLOYED";
    Status[Status["DETONATED"] = 4] = "DETONATED";
})(Status || (Status = {}));
