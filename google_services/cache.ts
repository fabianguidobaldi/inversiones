function getFromCache_(
    key: string,
    cacheLoaderFn: () => any,
    expirationTime: number
): any {
    const cache = CacheService.getDocumentCache();

    let value = cache.get(key);
    if (!value) {
        value = cacheLoaderFn();
        cache.put(key, JSON.stringify(value), expirationTime);
    }

    return JSON.parse(value);
}
