import CompanyUser from '../models/CompanyUser';
import User from '../models/User';

class CompanyUserController {
  // método usado para cadastrar uma nova empresa
  async store(req, res) {
    const { cnpj } = req.body;

    try {
      if (await CompanyUser.findOne({ cnpj })) {
        return res
          .status(400)
          .json({ error: 'Essa empresa já esta cadastrada' });
      }

      req.body.user = req.userId;
      const company = await CompanyUser.create(req.body);

      return res.json({ company });
    } catch (err) {
      return res.status(400).json({ error: 'Falha no envio!' });
    }
  }

  // atualiza os dados de uma empresa de acordo com seu usuário
  async update(req, res) {
    const { cnpj } = req.body;

    try {
      const user = await User.findById(req.userId);
      const companyUser = await CompanyUser.findOne({ cnpj, user });
      if (!companyUser) {
        return res
          .status(400)
          .json({ error: 'Empresa não encontrada para esse usuário' });
      }

      const company = await CompanyUser.findOneAndUpdate(
        { cnpj, user },
        req.body
      );

      return res.json({
        company,
        message: 'Dados da empresa atualizado com sucesso',
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao atualizar dados da empresa' });
    }
  }

  async companies(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
      const companiesUser = await CompanyUser.find({ user });
      return res.status(200).send({ data: companiesUser });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao recuperar empresas' });
    }
  }

  async delete(req, res) {
    try {
      const { cnpj } = req.params;
      const user = await User.findById(req.userId);
      const result = await CompanyUser.findOneAndDelete({ cnpj, user });
      if (!result) {
        return res.status(500).send({ errors: 'Erro ao deletar empresa' });
      }
      return res.status(200).send({ data: cnpj });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getCompanyByCNPJ(req, res) {
    try {
      const { cnpj } = req.params;
      const user = await User.findById(req.userId);
      const company = await CompanyUser.findOne({ cnpj, user });
      return res.status(200).send({ data: company });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new CompanyUserController();
