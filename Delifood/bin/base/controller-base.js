exports.post = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: 'Existe dados invalidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.create(data)
        res.status(201).send(resultado)
        
    } catch (err) {
        console.log('Erro ao fazer o post, motivo:', err);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
};

exports.put = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: 'Existe dados invalidos na sua requisição',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.update(req.params.id, data)
        res.status(202).send(resultado)
    } catch (err) {
        console.log('Erro ao fazer o put, motivo:', err);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
};

exports.get = async (repository,req, res) => {
    try {
        let data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        console.log('Erro ao fazer o get, motivo: ', error);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
};

exports.getById = async (repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await repository.getById(id);
            res.status(202).send(data)
        } else {
            res.status(400).send({ message: 'O parametro id precisa ser informado' })
        }
    } catch (err) {
        console.log('Erro ao fazer o getbyid, motivo:', err);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
};

exports.remove = async (repository, req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await repository.remove(id);
            res.status(200).send({ message: 'Excluido com sucesso', data })
        } else {
            res.status(400).send({ message: 'O registro não foi excluido' })
        }
    } catch (err) {
        console.log('Erro ao fazer o get, motivo:', err);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
};
