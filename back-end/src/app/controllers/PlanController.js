import * as Yup from 'yup';
import Plan from '../models/Plan';
import paginate from '../util/paginate';

class PlanController {
  async index(req, res) {
    const { page = 1, page_size = 5 } = req.query;

    const plans = await Plan.findAll(paginate(null, { page, page_size }));
    const total = await Plan.count();

    return res.json({
      plans,
      total,
      page,
      page_count: Math.ceil(
        total / (Number(page_size) > 0 ? Number(page_size) : 5)
      ),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findOne({ where: { id } });

    return res.json(plan);
  }

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

    return res.status(201).json(plan);
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

      const plan = await Plan.findByPk(req.params.id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan not found. ' });
      }

      const { id } = await plan.update({
        title,
        duration,
        price,
      });

      return res.status(200).json({ id, title, duration, price });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async destroy(req, res) {
    try {
      const plan = await Plan.findByPk(req.params.id);

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
