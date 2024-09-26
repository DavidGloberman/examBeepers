var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from "jsonfile";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const FILE_PATH = process.env.FILE_PATH || "./data/DB.json";
function ensureJsonFileExists() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(FILE_PATH)) {
            yield jsonfile.writeFile(FILE_PATH, []);
        }
    });
}
export const readJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ensureJsonFileExists();
    return yield jsonfile.readFile(FILE_PATH);
});
export const writeToJsonFile = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    yield ensureJsonFileExists();
    yield jsonfile.writeFile(FILE_PATH, beepers);
});
