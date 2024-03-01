package com.dataandjavaplus.dataandjava.service;

import com.dataandjavaplus.dataandjava.model.Data;
import com.dataandjavaplus.dataandjava.repository.DataRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    final DataRepository dataRepository;

    public DataService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<Data> getAllData() {

        return dataRepository.findAll();
    }

    public Data getSaveData(Data data) {

        return dataRepository.save(data);

    }

    public Data getEditData(Long id, Data data) {

        Data datadb = dataRepository.findById(id).orElseThrow(() -> new IllegalStateException("Böyle bir kullanıcı yok!!"));
        datadb.setName(data.getName());
        datadb.setAge(data.getAge());
        datadb.setDogumTarihi(data.getDogumTarihi());
        datadb.setMeslek(data.getMeslek());

        return dataRepository.save(datadb);


    }

    public void getDeleteData(Long id) {

        dataRepository.deleteById(id);
        /*
        dataRepository.findById(id)
                .map(data -> {
                    dataRepository.deleteById(id);
                    return ResponseEntity.status(HttpStatus.OK).body("Data with id " + id + " deleted successfully.");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data with id " + id + " not found."));

                */

    }
}
