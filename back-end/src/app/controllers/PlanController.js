import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const plan = await Plan.create({ ...req.body });

    return res.json(plan);
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        duration: Yup.number(),
        price: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validate fails' });
      }

      const { title, duration, price } = req.body;

      const plan = await Plan.findByPk(req.params.plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan not found. ' });
      }

      const { id } = await plan.update({
        title,
        duration,
        price,
      });

      return res.json({ id, title, duration, price });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async destroy(req, res) {
    try {
      const plan = await Plan.findByPk(req.params.plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan not found. ' });
      }

      await plan.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PlanController();
