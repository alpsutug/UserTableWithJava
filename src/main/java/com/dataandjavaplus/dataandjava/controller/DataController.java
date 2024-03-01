package com.dataandjavaplus.dataandjava.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.dataandjavaplus.dataandjava.model.Data;
import com.dataandjavaplus.dataandjava.service.DataService;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DataController {

    final DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/getAll")
    public List<Data> getAllData() {
        return dataService.getAllData();
    }

    @PostMapping("/saveData")
    public Data getSaveData(@RequestBody Data data) throws BadRequestException {
        if (data == null) {
            throw new BadRequestException("Kaydedilecek bir data bilgisi gönderilmelidir");
        }
        if (data.getName() == null) {
            throw new BadRequestException("Kaydedilecek bir data bilgisi gönderilmelidir");
        }
        return dataService.getSaveData(data);
    }

    @PutMapping("/editData")
    public Data getEditData(@RequestParam Long id,@RequestBody Data data) throws BadRequestException {
        if (id == null) {
            throw new BadRequestException("Düzeltilecek bir data id'si gönderilmelidir");
        }
        if (data == null) {
            throw new BadRequestException("Düzeltilecek bir data bilgisi gönderilmelidir");
        }
        return dataService.getEditData(id,data);

    }


    @DeleteMapping("/deleteData")
    public void getDeleteData(@RequestParam Long id) throws BadRequestException {
        if (id == null) {
            throw new BadRequestException("Silinecek bir data id'si gönderilmelidir");
        }

         dataService.getDeleteData(id);


    }
}
