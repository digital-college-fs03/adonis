import User from "#models/user";

export default class UserService {
    constructor(protected user: User) {}

    async create(value: Record<string, unknown>) {
        return this.user.fill(value).save()
    }
}