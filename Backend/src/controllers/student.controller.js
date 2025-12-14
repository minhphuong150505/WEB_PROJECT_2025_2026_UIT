import { StudentPortalService } from "../services/studentPortal.service.js";

export class StudentPortalController {
  // GET /students/:MaHocSinh/classes?MaHocKy=
  static async getMyClasses(req, res, next) {
    try {
      const { MaHocSinh } = req.params;
      const data = await StudentPortalService.getMyClasses({
        MaHocSinh,
        MaHocKy: req.query.MaHocKy ? Number(req.query.MaHocKy) : null,
      });
      res.json({ data });
    } catch (e) { next(e); }
  }

  // GET /students/:MaHocSinh/scores?MaHocKy=
  static async getMyScoresBySemester(req, res, next) {
    try {
      const { MaHocSinh } = req.params;
      const { MaHocKy } = req.query;
      if (!MaHocKy) throw { status: 400, message: "MaHocKy is required" };

      const data = await StudentPortalService.getMyScoresBySemester({
        MaHocSinh,
        MaHocKy: Number(MaHocKy),
      });
      res.json({ data });
    } catch (e) { next(e); }
  }
}
