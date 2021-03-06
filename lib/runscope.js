import axios from "axios"

class Runscope {
  constructor(token) {
    this.api_url = "https://api.runscope.com"
    this.token = token
    this.props = {
      baseURL: this.api_url,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${this.token}`
      }
    }

    this.instance = axios.create(this.props)
  }

  get(url) {
    return this.instance.get(url)
  }

  post(url, data) {
    return this.instance.post(url, data)
  }
}

export default Runscope
export {
  Runscope
}
