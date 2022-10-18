package com.controlclientes.Control.Clientes.dao;

import com.controlclientes.Control.Clientes.models.Clientes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ClienteDaoImp implements ClienteDao {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Clientes> getClientes() {
        String query="From Clientes";
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Clientes clientes = entityManager.find(Clientes.class,id);
        entityManager.remove(clientes);
    }

    @Override
    public List<Clientes> getInfoClientes(Long id) {
        String query="From Clientes WHERE id = " + id ;
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void editar(Clientes cliente) {
        entityManager.merge(cliente);
    }

    @Override
    public void registro(Clientes cliente) {
        entityManager.merge(cliente);
    }
}
