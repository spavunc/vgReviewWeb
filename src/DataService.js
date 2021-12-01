import axios from 'axios'

const SHOWCASE = 'showcase'
const API_URL = 'http://localhost:8080'
const SHOWCASE_API_URL = `${API_URL}/game/${SHOWCASE}`

class DataService {

    retrieveAllCourses() {
        return axios.get(`${SHOWCASE_API_URL}`
        );
    }
}

export default new DataService()