import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";
console.log("base url", BASE_URL);
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static authToken;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

//gets all companies
  static async getCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }
//Gets all Jobs
  static async getJobs() {
    let res = await this.request("jobs/");
    return res.jobs;
  }
 //User Sign UP
  static async signup({ username, password, firstName, lastName, email }) {
    const res = await this.request("auth/register", {
      username,
      password,
      firstName,
      lastName,
      email,
    }, "post");
    JoblyApi.token = res.token; // Save the token
    return res.token;
  }

  //User Login
  static async login({ username, password }) {
    const res = await this.request("auth/token", { username, password }, "post");
    JoblyApi.token = res.token; // Save the token
    console.log("from login", jwtDecode(JoblyApi.token));
    return res.token;
  }

  // User logout
  static logout() {
    JoblyApi.token = null; // Clear the token
  }

  //Get user info
  static async getUser(username) {
    if (JoblyApi.token === null || JoblyApi.token === 'null') {
      return null;
    }
    console.log("current info",jwtDecode(JoblyApi.token));
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  //update user
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async applyJob() {
    const res = await this.request(`users/${username}/jobs/${jobid}`, method="post")
  }


}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;