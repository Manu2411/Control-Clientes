package com.controlclientes.Control.Clientes.controllers;

import com.controlclientes.Control.Clientes.dao.ClienteDao;
import com.controlclientes.Control.Clientes.models.Clientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClienteController {

    @Autowired
    private ClienteDao clienteDao;

    @RequestMapping(value = "api/clientes")
    public List<Clientes> getClientes(){

        return clienteDao.getClientes();
    }

    @RequestMapping(value = "api/clientes/{id}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id){

        clienteDao.eliminar(id);
    }

    /*@RequestMapping(value = "clientes/{id}", method = RequestMethod.GET)
    public Clientes getCliente(@PathVariable Long id){
        Clientes cliente = new Clientes();
        cliente.setId(id);
        cliente.setNombre("Manuel");
        cliente.setApellido("Hurtado");
        cliente.setDomicilio("Ilopango, S.S");
        cliente.setTelefono("22959180");
        cliente.setCompra(230.40);

        return cliente;
    }*/

}