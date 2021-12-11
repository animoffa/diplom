export class APIServiceResource {
    constructor(baseUrl) {
        if (APIServiceResource.instance)
            throw new Error("Use getInstance() instead of new");

        this.baseUrl = baseUrl;
        APIServiceResource.instance = this;
    }

    fetch(adrs, config) {
        const url = `${this.baseUrl}/${adrs}`;
        return fetch(url, config);
    }

    getAuth() {
        return this.fetch(`me`, ({method: 'GET', headers: APIServiceResource.MethodType.getHeaders()}));
    }
    editUser(User) {
        return this.fetch(`me`, ({method: 'PUT',body: JSON.stringify(User), headers: APIServiceResource.MethodType.getHeaders()}));
    }

    register(newUser) {
        return this.fetch(`registration`, ({
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: APIServiceResource.MethodType.getHeaders()
        }));
    }

    login(user) {
        return this.fetch(`login`, ({
            method: 'POST',
            body: JSON.stringify(user),
            headers: APIServiceResource.MethodType.getHeaders()
        }));
    }

    static MethodType = {
        getHeaders: () => {
            return {
                'Content-Type': 'application/json',
                'Authentication': "Bearer " + localStorage.getItem('token')
            }
        },
    };
}

export default new APIServiceResource('http://localhost:8080');