import { io } from "socket.io-client"


class IOClass {
    constructor() {
        if (IOClass._instance) {
            throw new Error("Singleton classes can't be instantiated more than once.")
        }
        IOClass._instance = this;
        this.io = io;
    }
}
const IO = new IOClass().io;

export { IO };