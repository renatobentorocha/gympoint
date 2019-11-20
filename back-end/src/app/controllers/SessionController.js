import AdminSession from '../services/AdminSession';
import StudentSession from '../services/StudentSession';

class SessionController {
  async store(req, res) {
    const { application } = req.headers;

    if (application === 'MOBILE') {
      return StudentSession.store(req, res);
    }

    return AdminSession.store(req, res);
  }
}

export default new SessionController();
