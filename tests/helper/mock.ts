import User from "#models/user";

export class MockUer extends User {
    save(): Promise<this> {
        this.id = 99
        return Promise.resolve(this)
    }
}
