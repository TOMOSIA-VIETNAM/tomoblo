const getLocalStorage = (key) => {
  if (typeof window !== `undefined`) {
    return localStorage.getItem(key)
  }
}

const getPathUrl = () => {
  if (typeof window !== `undefined`) {
    return window.location.href
  }
}

const redirectTo = (uri) => {
  if (typeof window !== `undefined`) {
    return window.location.replace(uri)
  }
}

module.exports = {
  getLocalStorage,
  getPathUrl,
  redirectTo
};
