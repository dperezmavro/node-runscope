var axios = require("axios");

class Runscope {
	constructor(token){
		this.api_url = "https://api.runscope.com";
		this.token = token;
		this.props = {
			baseURL: this.api_url,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			}
		};

        this.instance = axios.create(this.props);
	}
}

module.exports = Runscope;
