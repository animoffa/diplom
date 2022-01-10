export class APIServiceResource {
    constructor(baseUrl) {
        if (APIServiceResource.instance)
            throw new Error("Use getInstance() instead of new");

        this.baseUrl = baseUrl;
        APIServiceResource.instance = this;
    }

    fetch(config, resourceName, id) {
        let url = `${this.baseUrl}/${resourceName}`;
        if (id) url += `/${id}`;
        return fetch(url, config);
    }

    getResources(resourceName) {
        this.isResourceExists(resourceName);
        console.log(APIServiceResource.MethodType.GET());
        return this.fetch(APIServiceResource.MethodType.GET(), APIServiceResource.ResourceType[resourceName]);
    }

    createResource(resourceName, newResource) {
        this.isResourceExists(resourceName);
        return this.fetch(APIServiceResource.MethodType.POST(newResource), APIServiceResource.ResourceType[resourceName]);

    }

    updateResource(resourceName, newValues) {
        this.isResourceExists(resourceName);
        return this.fetch(APIServiceResource.MethodType.PUT(newValues), APIServiceResource.ResourceType[resourceName]);
    }
    updateResourceID(resourceName, id, newValues) {
        this.isResourceExists(resourceName);
        return this.fetch(APIServiceResource.MethodType.PUT(newValues), APIServiceResource.ResourceType[resourceName], id);
    }

    deleteResource(resourceName, id) {
        this.isResourceExists(resourceName);
        return this.fetch(APIServiceResource.MethodType.DELETE(), APIServiceResource.ResourceType[resourceName], id);
    }

    isResourceExists(resourceName) {
        if (!APIServiceResource.ResourceType[resourceName])
            throw new Error("No such resource: " + resourceName);
    }

    static MethodType = {
        getHeaders: () => {
            return {
                'Content-Type': 'application/json',
                'Authentication': "Bearer " + localStorage.getItem('token')
            }
        },

        GET: () => ({method: 'GET', headers: APIServiceResource.MethodType.getHeaders()}),
        POST: (body) => ({method: 'POST', body: JSON.stringify(body), headers: APIServiceResource.MethodType.getHeaders()}),
        PUT: (body) => ({method: 'PUT', body: JSON.stringify(body), headers: APIServiceResource.MethodType.getHeaders()}),
        DELETE: () => ({method: 'DELETE', headers: APIServiceResource.MethodType.getHeaders()}),
    };

    static ResourceType = {articles: 'articles', users: 'users', comment: 'comment', scrapping: 'scrapping'};
}

export default new APIServiceResource('http://localhost:8080');
