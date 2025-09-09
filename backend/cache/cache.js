import { TTL } from "./constants.js"

const cache = new Map()

export function setCache(key, data) {
  const expire = Date.now() + TTL
  cache.set(key, { data, expire })

  setTimeout(() => {
    const cached = cache.get(key)
    if (cached && cached.expire <= Date.now()) {
      cache.delete(key)
    }
  }, TTL)

  return data
}

export function getCache(key) {
  const cached = cache.get(key)
  if (!cached) return null

  if (cached.expire <= Date.now()) {
    cache.delete(key)
    return null
  }

  return cached.data
}